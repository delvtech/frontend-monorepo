// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

import "./MultiToken.sol";
import "./interfaces/IYieldAdapter.sol";
import "./interfaces/ITerm.sol";
import "./interfaces/IERC20.sol";
import "./libraries/Authorizable.sol";

abstract contract Term is ITerm, MultiToken, IYieldAdapter, Authorizable {
    // Struct to store packed yield term info, packed into one sstore
    struct YieldState {
        uint128 shares;
        uint128 pt;
    }

    // Struct to store for finalized expired timestamps, packed into one sstore
    struct FinalizedState {
        uint128 pricePerShare;
        uint128 interest;
    }

    // Maps expiration timestamps to the shares held backing the PT/YT at that timestamp
    mapping(uint256 => uint256) public sharesPerExpiry;
    // Maps the YT ID packed as [1][start time][expiry] to the shares and principal tokens
    // which exist for this yield start point
    mapping(uint256 => YieldState) public yieldTerms;
    // When terms are finalized we cache the final price per share and outstanding total interest
    mapping(uint256 => FinalizedState) public finalizedTerms;

    // The underlying token
    IERC20 public immutable override token;
    // The decimals and decimal adjusted constant 1
    uint8 public immutable decimals;
    uint256 public immutable one;

    // The unlocked term details
    // Note - No PT should ever exist with this ID
    uint256 public constant UNLOCKED_PT_ID = 0;
    uint256 public constant UNLOCKED_YT_ID = 1 << 255;

    /// @notice Runs the initial deployment code
    /// @param _linkerCodeHash The hash of the erc20 linker contract deploy code
    /// @param _factory The factory which is used to deploy the linking contracts
    /// @param _token The ERC20 which is deposited into this contract
    /// @param _owner this addresss will be made owner
    constructor(
        bytes32 _linkerCodeHash,
        address _factory,
        IERC20 _token,
        address _owner
    ) MultiToken(_linkerCodeHash, _factory) {
        // Set the immutable token data
        token = _token;
        uint8 _decimals = _token.decimals();
        decimals = _decimals;
        one = 10**decimals;
        setOwner(_owner);
    }

    /// @notice Takes an input as a mix of the underlying token, expired PT and YT, and unlocked shares
    ///      then uses their value to create new PT and YT. Cannot make unlocked deposit shares
    /// @param assetIds The array of PT, YT and Unlocked share identifiers. NOTE - The IDs MUST be unique
    ///                 and sorted.
    /// @param assetAmounts The amount of each input PT, YT and Unlocked share to use
    /// @param underlyingAmount The amount of underlying transferred from the user.
    /// @param hasPreFunding If true a user can forward tokens ahead instead of doing transfer from
    /// @param ytDestination The address to mint the YTs to
    /// @param ptDestination The address to mint the PTs to
    /// @param ytBeginDate The start timestamp of the YTs, note if it is in the future the
    ///                    Yt will be created at current timestamp.
    /// @param expiration the expiration timestamp
    /// @return Returns the number of principal and yield tokens created
    function lock(
        uint256[] memory assetIds,
        uint256[] memory assetAmounts,
        uint256 underlyingAmount,
        bool hasPreFunding,
        address ytDestination,
        address ptDestination,
        uint256 ytBeginDate,
        uint256 expiration
    ) external returns (uint256, uint256) {
        // If the user enters something larger than the current timestamp we set the yt
        // expiry to the current timestamp
        ytBeginDate = ytBeginDate >= block.timestamp
            ? block.timestamp
            : ytBeginDate;
        // Next check the validity of the requested expiry
        require(expiration > block.timestamp, "todo nice error");
        // The yt can't start after
        // Running tally of the added value
        uint256 totalValue = 0;
        // Running total of the total shares
        uint256 totalShares = 0;

        // Transfer underlying into the contract and then deposit into the yield source
        if (underlyingAmount != 0) {
            // Transfer in shares
            token.transferFrom(msg.sender, address(this), underlyingAmount);
        }
        // If the user is transferred from or they have transferred themselves
        // NOTE - These pre-funding paths allow external call sequencers to avoid ERC20 transfers
        if (underlyingAmount != 0 || hasPreFunding) {
            // We check if the deposit should be in the locked or unlocked state
            // Note - The code path difference is that locked must be invested while
            //        for some hard to withdraw yield strategies the unlocked term may not be
            (totalShares, totalValue) = _deposit(ShareState.Locked);
        }

        // We pre-declare the index of the for loop to handle a special case
        uint256 i = 0;
        uint256 previousId = 0;
        // If the user has supplied 'unlocked' tokens because of the sorting they must
        // be the first index
        if (assetIds.length > 0 && assetIds[0] == UNLOCKED_YT_ID) {
            // Burn the unlocked asset from the user
            (uint256 unlockedShares, uint256 value) = _releaseAsset(
                UNLOCKED_YT_ID,
                msg.sender,
                assetAmounts[0]
            );
            // Record the value
            totalValue += value;
            // Convert the shares
            totalShares += _convert(ShareState.Unlocked, unlockedShares);
            // Do not do the first step of the for loop
            i = 1;
            previousId = UNLOCKED_YT_ID;
        }

        // Deletes (burn) any assets which are rolling over and returns how many much in terms of
        // shares and value they are worth.
        for (; i < assetIds.length; i++) {
            // helps the stack
            uint256 id = assetIds[i];
            uint256 amount = assetAmounts[i];
            // Requiring strict sorting is a cheap way to check for uniqueness
            require(previousId < id, "Todo: Not unique or not sorted");
            previousId = id;
            // Burns the tokens from the user account and returns how much they were worth
            // in shares and token value. Does not formally withdraw from yield source.
            (uint256 shares, uint256 value) = _releaseAsset(
                id,
                msg.sender,
                amount
            );

            // Record the shares which were released. Note these cannot be the special case
            // unlocked share type they must be locked shares
            totalShares += shares;
            // No matter the source add the value to the running total
            totalValue += value;
        }

        // Use the total value to create the yield tokens, also sets internal accounting
        uint256 discount = _createYT(
            ytDestination,
            totalValue,
            totalShares,
            ytBeginDate,
            expiration
        );
        // Mint the user principal tokens
        // Note - Reverts if the user is trying to enter a term where they have not supplied enough
        //        value to pay for accumulated interest, the user should choose a more recent term.
        if (totalValue - discount > 0) {
            _mint(expiration, ptDestination, totalValue - discount);
        }
        // In this case the PT is totalValue - discount and the YT is total value
        return (totalValue - discount, totalValue);
    }

    /// @notice Creates an unlocked deposit into the term which can be withdraw at any time
    ///         this deposit can be locked into principal and yield tokens. It may or may not
    ///         earn interest depending on the implementation.
    /// @dev We use this functionality to help manage fund flow in the AMM, and keep LP funds invested
    /// @param underlyingAmount The token which will be transferred from the caller
    /// @param ptAmount If this is larger than zero the function will also try to burn PT from the caller
    /// @param ptId The id of the pt which is burned from the user
    /// @param destination The destination of the outputted unlocked shares
    /// @return the value of the deposit, and the shares created
    function depositUnlocked(
        uint256 underlyingAmount,
        uint256 ptAmount,
        uint256 ptId,
        address destination
    ) external override returns (uint256, uint256) {
        // If the user will send in tokens then transfer from them
        if (underlyingAmount != 0) {
            token.transferFrom(msg.sender, address(this), underlyingAmount);
        }
        // Do a deposit
        (uint256 shares, uint256 value) = _deposit(ShareState.Unlocked);

        // If we are also redeeming a PT
        if (ptAmount != 0) {
            // Ensure this is a PT Id
            require(ptId >> 255 == 0, "Not pt");
            require(ptId < block.timestamp, "Not expired");
            // Then we burn the pt from the user and release its shares
            (uint256 lockedShares, uint256 ptValue) = _releaseAsset(
                ptId,
                msg.sender,
                ptAmount
            );
            // We convert those shares to a 'unlocked' form
            uint256 unlockedShares = _convert(ShareState.Locked, lockedShares);
            // Add them to ongoing totals
            shares += unlockedShares;
            value += ptValue;
        }
        // Mint YT for the user
        _createYT(destination, value, shares, 0, 0);
        // Return how much was deposited and the shares created
        return (value, shares);
    }

    /// @notice Redeems expired PT, YT and unlocked shares for their backing asset.
    /// @param destination The address to send the unlocked tokens too
    /// @param tokenIds The IDs of the token to unlock. NOTE- They MUST be unique and sorted.
    /// @param amounts The amounts of the tokens to unlock
    /// @return the total value of the tokens that have been unlocked
    function unlock(
        address destination,
        uint256[] memory tokenIds,
        uint256[] memory amounts
    ) external override returns (uint256) {
        // To release shares we delete any input PT and YT, these may be unlocked or locked
        uint256 releasedSharesLocked = 0;
        uint256 releasedSharesUnlocked = 0;
        uint256 previousId = 0;
        // Deletes any assets which are rolling over and returns how many much in terms of
        // shares and value they are worth.
        for (uint256 i = 0; i < tokenIds.length; i++) {
            // Requiring strict sorting is a cheap way to check for uniqueness
            require(previousId < tokenIds[i], "Todo: Not unique or not sorted");
            previousId = tokenIds[i];
            // Burns the tokens from the user account and returns how much they were worth
            // in shares and token value. Does not formally withdraw from yield source.
            (uint256 shares, ) = _releaseAsset(
                tokenIds[i],
                msg.sender,
                amounts[i]
            );

            // Record the shares which were released
            if (tokenIds[i] == UNLOCKED_YT_ID) {
                releasedSharesUnlocked += shares;
            } else {
                releasedSharesLocked += shares;
            }
        }

        // Withdraw the released shares
        uint256 valueFromLocked = 0;
        uint256 valueFromUnlocked = 0;
        // Only do the withdraw calls if there's something to withdraw
        // Note these calls will send the asset to the destination.
        if (releasedSharesLocked != 0) {
            valueFromLocked = _withdraw(
                releasedSharesLocked,
                destination,
                ShareState.Locked
            );
        }
        if (releasedSharesUnlocked != 0) {
            valueFromUnlocked = _withdraw(
                releasedSharesUnlocked,
                destination,
                ShareState.Unlocked
            );
        }

        // Return the total value released
        return (valueFromLocked + valueFromUnlocked);
    }

    /// @notice Quotes the price per share for unlocked tokens
    /// @return the price per share of unlocked shares
    function unlockedSharePrice() external view override returns (uint256) {
        return _underlying(one, ShareState.Unlocked);
    }

    /// @notice creates yield tokens
    /// @param destination the address the YTs belong to
    /// @param value the value of YTs to create
    /// @param totalShares the shares used to create YTs
    /// @param startTime the timestamp when the term started
    /// @param expiration the expiration of the term
    /// @return the amount created
    function _createYT(
        address destination,
        uint256 value,
        uint256 totalShares,
        uint256 startTime,
        uint256 expiration
    ) internal returns (uint256) {
        // We create only YT for the user with a 100% discount
        if (expiration == 0) {
            // In the unlocked term all assets are held as YT with a direct conversion to shares
            // The yield source should account for any changes in value as deposit withdraw happens
            _mint(UNLOCKED_YT_ID, destination, totalShares);
            // Increment shares per start
            yieldTerms[UNLOCKED_YT_ID].shares += uint128(totalShares);
            // Return that this is a 100% discount so no PT are made
            return value;
        } else {
            uint256 yieldTokenId = (1 << 255) + (startTime << 128) + expiration;
            // For new YT, we split into two cases ones at this block and back dated
            if (startTime == block.timestamp) {
                // Initiate a new term
                _mint(yieldTokenId, destination, value);
                // Increase recorded share data
                yieldTerms[yieldTokenId].shares += uint128(totalShares);
                yieldTerms[yieldTokenId].pt += uint128(value);
                sharesPerExpiry[expiration] += totalShares;
                // No interest earned and no discount.
                return 0;
            } else {
                // In this case the yield token is being backdated to match a pre-existing term
                // We require that it already existed, or we would not be able to capture accurate
                // interest rate data in the period
                YieldState memory state = yieldTerms[yieldTokenId];
                require(state.shares != 0 && state.pt != 0, "Todo nice error");
                // We calculate the current fair value of the YT by dividing the interest
                // earned by the number of YT. We can get the interest earned by subtracting
                // PT outstanding from the share multiplied by current price per share
                // NOTE - This step makes a strong assumption on the inputs to this function.
                uint256 impliedShareValue = (value * uint256(state.shares)) /
                    totalShares;
                // NOTE - Reverts on negative interest or on some 0 interest rounding errors
                uint256 interestEarned = impliedShareValue - uint256(state.pt);
                // Cost per yt is (interestEarned/total_yt) so the total discount is how many
                // YT the user wants to mint [ie 'value']
                uint256 totalDiscount = (value * interestEarned) /
                    totalSupply[yieldTokenId];
                // Now we mint the YT for the user
                _mint(yieldTokenId, destination, value);
                // Update the reserve information for this YT term, and the total shares
                // backing the PT it will create.
                // NOTE - Reverts here if the interest is over 100% for the YT being minted
                yieldTerms[yieldTokenId] = YieldState(
                    state.shares + uint128(totalShares),
                    state.pt + uint128(value - totalDiscount)
                );
                // Return the discount so the right number of PT are minted
                return totalDiscount;
            }
        }
    }

    /// @notice Deletes an asset [expired PT/YT or unlocked share] and returns the shares released
    ///         and their value. Note - Shares from unlocked assets may be different than from PT/YT
    /// @param assetId The ID for the asset redeemed
    /// @param source The account to delete tokens from
    /// @param amount The amount to delete from the user.
    /// @return returns shares and their value
    function _releaseAsset(
        uint256 assetId,
        address source,
        uint256 amount
    ) internal returns (uint256, uint256) {
        // Note for both yt and pt the first 128 bits contain the expiry.
        uint256 expiry = assetId & (2**(128) - 1);
        // Check that the expiry has been hit
        require(expiry <= block.timestamp || expiry == 0, "todo nice error");
        // Load the data which is cached when the first asset is released
        FinalizedState memory finalState = finalizedTerms[expiry];
        // If the term's final interest rate has not been recorded we record it
        if (assetId != UNLOCKED_YT_ID && finalState.interest == 0) {
            finalState = _finalizeTerm(expiry);
        }

        //  Special case the unlocked share redemption
        if (assetId == UNLOCKED_YT_ID) {
            return _releaseUnlocked(source, amount);
        } else if (assetId >> 255 == 1) {
            // If the top bit is one do YT redemption
            return _releaseYT(finalState, assetId, source, amount);
        } else {
            return _releasePT(finalState, assetId, source, amount);
        }
    }

    /// @notice Before any PT/YT can be withdrawn from an expired timestamp the market interest rate is
    ///         cached. This call stores that price cache plus the implied outstanding interest.
    /// @param expiry The term's expiration time
    /// @return finalState The finalized term state for this expiry.
    function _finalizeTerm(uint256 expiry)
        internal
        returns (FinalizedState memory finalState)
    {
        // All shares corresponding to PT and YT expiring now
        uint256 termShares = sharesPerExpiry[expiry];
        // Load the implied value of term shares
        uint256 totalValue = _underlying(termShares, ShareState.Locked);
        // The interest is the value minus pt supply
        uint256 totalInterest = totalValue - totalSupply[expiry];
        // The shares needed to release this value at this point are calculated from the
        // implied price per share
        uint256 pricePerShare = (totalValue * one) / termShares;
        // Store this info and return
        finalState.interest = uint128(totalInterest);
        finalState.pricePerShare = uint128(pricePerShare);
        finalizedTerms[expiry] = finalState;
    }

    /// @notice Redeems unlocked term asset from a user
    /// @param source The user address who's balance to reduce
    /// @param amount The number of unlocked asset to reduce
    /// @return returns the shares unlocked and the amount they are worth
    function _releaseUnlocked(address source, uint256 amount)
        internal
        returns (uint256, uint256)
    {
        // In this case we just do a proportional withdraw from the shares for this asset
        uint256 termShares = yieldTerms[UNLOCKED_YT_ID].shares;
        uint256 userShares = (termShares * amount) /
            totalSupply[UNLOCKED_YT_ID];

        // Query the value of these shares
        uint256 shareValue = _underlying(userShares, ShareState.Unlocked);

        // Burn from the user
        _burn(UNLOCKED_YT_ID, source, amount);
        // Subtract their shares from total
        yieldTerms[UNLOCKED_YT_ID].shares = uint128(termShares - userShares);
        // Return the shares released and their value
        return (userShares, shareValue);
    }

    /// @notice Removes expired YT from a user account and returns the shares released and their value
    /// @param finalState The finalized state of term with total interest and final price per share
    /// @param assetId The YT ID for this term
    /// @param source The account which is the source of this YT
    /// @param amount The amount of YT to remove from the user account.
    function _releaseYT(
        FinalizedState memory finalState,
        uint256 assetId,
        address source,
        uint256 amount
    ) internal returns (uint256, uint256) {
        // To release YT we calculate the implied earning of the differential between final price per share
        // and the stored price per share at the time of YT creation.
        YieldState memory yieldTerm = yieldTerms[assetId];
        uint256 termEndingValue = (yieldTerm.shares *
            finalState.pricePerShare) / one;
        uint256 termEndingInterest = termEndingValue - yieldTerm.pt;
        // Calculate the value of this yt redemption by dividing total value by the number of YT
        uint256 totalYtSupply = totalSupply[assetId];
        uint256 userInterest = (termEndingInterest * amount) / totalYtSupply;
        // Now we load current share price to see how many shares the user is owed
        uint256 currentPricePerShare = _underlying(one, ShareState.Locked);
        uint256 userShares = (userInterest * one) / currentPricePerShare;
        // Now we decrement the PT shares and interest outstanding
        uint256 expiry = assetId & (2**(128) - 1);
        sharesPerExpiry[expiry] -= userShares;
        finalizedTerms[expiry].interest -= uint128(userInterest);
        // Next burn the user's YT and update the finalized YT info
        _burn(assetId, source, amount);
        // Note we proportionally reduce the shares and pt for the term to keep the final
        // interest earned per share the same in future calculations.
        yieldTerm.shares = uint128(
            (uint256(yieldTerm.shares) * amount) / totalYtSupply
        );
        yieldTerm.pt = uint128(
            (uint256(yieldTerm.pt) * amount) / totalYtSupply
        );
        yieldTerms[assetId] = yieldTerm;
        // Return the shares released and value
        return (userShares, userInterest);
    }

    /// @notice Releases PT from a user and returns the shares and value it was worth
    /// @param finalState The finalized state of the term
    /// @param assetId The ID of the PT, which will be equal to the expiry
    /// @param amount The number of PT to reduce
    /// @return the number of shares and their value
    function _releasePT(
        FinalizedState memory finalState,
        uint256 assetId,
        address source,
        uint256 amount
    ) internal returns (uint256, uint256) {
        // We release the PT by deducting the shares needed to pay interest obligations
        // then distributing the remaining shares pro-rata [meaning PT earn interest after expiry]

        uint256 termShares = sharesPerExpiry[assetId];
        uint256 currentPricePerShare = _underlying(one, ShareState.Locked);
        // Now we use the price per share to calculate the shares needed to satisfy interest
        uint256 sharesForInterest = (finalState.interest * one) /
            currentPricePerShare;
        // The remaining shares for PT holders
        uint256 ptShares = termShares - sharesForInterest;
        // The user's shares are their percent of the total
        // Note - This is more than 1 to 1 as interest goes up
        uint256 userShares = (amount * ptShares) / totalSupply[assetId];
        // Burn from the user and deduct their freed shares from the total for this term
        _burn(assetId, source, amount);
        sharesPerExpiry[assetId] = termShares - userShares;
        // Return the shares freed and use the price per share to get value
        return (userShares, (userShares * currentPricePerShare) / one);
    }

    /// @notice takes an input YT in the past and creates a new one in the future
    /// @param assetId The ID of the YT to delete
    /// @param amount The number of YT to delete
    /// @param destination The address to credit the new YT to
    /// @param isCompound if true the interest is compounded instead of released
    /// @return the accrued interest in underlying
    function convertYT(
        uint256 assetId,
        uint256 amount,
        address destination,
        bool isCompound
    ) external returns (uint256) {
        // make sure asset is a YT
        require(assetId >> 255 == 1, "asset ID is not YT");
        // expiry must be greater than zero
        uint256 expiry = assetId & (2**(128) - 1);
        require(expiry > 0, "invalid expiry");
        // start date must be greater than zero
        uint256 startDate = ((assetId) & (2**255 - 1)) >> 128;
        require(startDate > 0, "invalid token start date");

        // load the state for the term
        YieldState memory state = yieldTerms[assetId];
        // make sure a term exists for the input asset
        // todo: is this logic good or should be &&?
        require(state.pt != 0 || state.shares != 0, "no term for input asset");
        // calculate the shares belonging to the user
        uint256 userShares = (state.shares * amount) / totalSupply[assetId];
        // remove shares from the yield state and the yt to burn from pt

        yieldTerms[assetId] = YieldState(
            state.shares - uint128(userShares),
            state.pt - uint128(amount)
        );

        // burn the yt from the user's balance
        _burn(assetId, msg.sender, amount);

        uint256 value = _underlying(amount, ShareState.Locked);

        if (isCompound) {
            // deposit freed shares into YT
            uint256 discount = _createYT(
                destination,
                value,
                userShares,
                block.timestamp,
                expiry
            );
            // yt created at current time so discount should always be 0
            require(discount == 0, "todo nice error");
            // create PT
            _mint(expiry, destination, value - amount);
        } else {
            // calculate the user's interest in terms of shares
            uint256 interestShares = ((value - amount) * userShares) / value;
            // withdraw the interest from the yield source
            _withdraw(interestShares, destination, ShareState.Locked);
            // create yt with remaining shares
            _createYT(
                destination,
                amount,
                userShares - interestShares,
                block.timestamp,
                expiry
            );
            // update the state for expiry timestamps
            sharesPerExpiry[expiry] -= interestShares;
        }
        return (value - amount);
    }

    /// @notice removes and burns input amount of YT's and PT's
    /// @param yieldTokenId the yt to redeem
    /// @param principalTokenId the pt to redeem
    /// @param amount the quantity of asset to remove
    /// @return the underlying value withdrawn
    function redeem(
        uint256 yieldTokenId,
        uint256 principalTokenId,
        uint256 amount
    ) external onlyAuthorized returns (uint256) {
        // yieldTokenId 256 bits:
        //        |      1 BIT    |     127 BITS     |  128 BITS  |
        //        |       255     |     254 - 128    |  127 - 0   |
        //        | YT IDENTIFIER |    START TIME    | EXPIRATION |
        //           (1 << 255) + (startTime << 128) + expiration

        // principalTokenId 128 bits:
        //        |  128 BITS  |
        //        |  127 - 0   |
        //        | EXPIRATION |

        // The YTs and PTs must be from the same term and therefore
        // the expiration times must be equal
        uint256 ytExpiry = yieldTokenId & (2**(128) - 1);
        require(ytExpiry == principalTokenId, "tokens from different terms");

        // YTs can have different start times for a particular expiry.
        // This means that each YieldState instance is backed by
        // a different amount of underlying at a different share price.
        YieldState memory state = yieldTerms[yieldTokenId];
        // multiply this YieldState instance's shares by the ratio
        // of the YTs the user wants to redeem (i.e. amount) to totalYTSupply
        // for this YieldState instance.
        uint128 totalSharesRedeemable = uint128(
            (state.shares * amount) / totalSupply[yieldTokenId]
        );
        // Update local YieldState instance with adjusted values
        state.shares -= totalSharesRedeemable;
        state.pt -= uint128(amount);
        // burn the yts and pts being redeemed
        _burn(yieldTokenId, msg.sender, amount);
        _burn(principalTokenId, msg.sender, amount);
        // update storage instance
        yieldTerms[yieldTokenId] = state;
        // Update the sharesPerExpiry. Note that the sum of the shares
        // in each YieldState instance with the same expiry should match
        // this value
        sharesPerExpiry[principalTokenId] -= totalSharesRedeemable;
        // withdraw shares from vault to user and return the amount of underlying withdrawn
        return _withdraw(totalSharesRedeemable, msg.sender, ShareState.Locked);
    }
}
