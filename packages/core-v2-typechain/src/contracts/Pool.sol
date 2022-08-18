// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

import "./LP.sol";
import "./libraries/FixedPointMath.sol";
import "./libraries/YieldSpaceMath.sol";
import "./libraries/Authorizable.sol";
import "./libraries/TWAROracle.sol";
import "./interfaces/IMultiToken.sol";
import "./interfaces/ITerm.sol";
import "./libraries/Errors.sol";

contract Pool is LP, Authorizable, TWAROracle {
    // Lets us use the fixed point math library as calls
    using FixedPointMath for uint256;

    // Constant Year in seconds, note there's no native support because of leap seconds
    uint256 internal constant _ONE_YEAR = 31536000;

    /// A percentage commission get charge on every trade & get distributed to LPs.
    /// It is in 18 decimals
    uint128 public tradeFee;
    /// The percentage of fees that can be transferred to governance
    uint128 public governanceFeePercent;
    /// Governance contract that allows to do some administrative operation.
    address public immutable governanceContract;

    /// Fees collected for governance
    struct CollectedFees {
        /// Fees in terms of shares.
        uint128 feesInShares;
        /// Fees in terms of bonds.
        uint128 feesInBonds;
    }

    /// Sub Pool specific details.
    struct SubPoolParameters {
        // The number of years to stretch time by, represented as 1000 times
        // the fraction. IE 4.181 = 4181 and 0.001 = 1
        uint32 timestretch;
        /// Price per share at the time of initialization in 18 point fixed
        uint224 mu;
    }

    /// Mapping to keep track of fee collection corresponds to `poolId`.
    mapping(uint256 => CollectedFees) public governanceFees;

    /// Sub pool parameters;
    mapping(uint256 => SubPoolParameters) public parameters;

    // ------------------------------ Events ------------------------------//

    /// Emitted when the pool reserves get updated.
    event Sync(
        uint256 indexed poolId,
        uint256 bondReserve,
        uint256 shareReserve
    );

    /// Emitted event when the bonds get traded.
    event BondsTraded(
        uint256 indexed poolId,
        address indexed receiver,
        bool indexed isBuy,
        uint256 amountIn,
        uint256 amountOut
    );

    /// Emitted when the YTs got purchased.
    event YtPurchased(
        uint256 indexed poolId,
        address indexed receiver,
        uint256 amountOfYtMinted,
        uint256 sharesIn
    );

    /// @notice Initialize the contract with below params.
    /// @param _term Address of the YieldAdapter whose PTs and YTs are supported with this Pool.
    /// @param _token The ERC20 token
    /// @param _tradeFee Percentage of fee get deducted during any trade, Should be in 18 decimals
    /// @param _erc20ForwarderCodeHash The hash of the erc20 forwarder contract deploy code.
    /// @param _governanceContract Governance contract address.
    /// @param _erc20ForwarderFactory The factory which is used to deploy the forwarder contracts.
    constructor(
        ITerm _term,
        IERC20 _token,
        uint256 _tradeFee,
        bytes32 _erc20ForwarderCodeHash,
        address _governanceContract,
        address _erc20ForwarderFactory
    )
        LP(_token, _term, _erc20ForwarderCodeHash, _erc20ForwarderFactory)
        TWAROracle()
        Authorizable()
    {
        // Should not be zero.
        if (_governanceContract == address(0))
            revert ElementError.RestrictedZeroAddress();

        // Set the owner of this contract
        _authorize(_governanceContract);
        setOwner(_governanceContract);

        // approve the max allowance for the term contract to
        // transfer from the pool for depositUnlocked
        _token.approve(address(_term), type(uint256).max);

        //----------------Perform some sstore---------------------//
        tradeFee = uint128(_tradeFee);
        governanceContract = _governanceContract;
    }

    /// @notice Returns the name of the sub token i.e LP token supported
    ///         by this contract.
    /// @param poolId The id of the sub token to get the name of, will be the expiry
    /// @return Returns the name of this token
    function name(uint256 poolId)
        external
        view
        override
        returns (string memory)
    {
        return (string(abi.encodePacked("LP: ", term.name(poolId))));
    }

    /// @notice Returns the symbol of the sub token i.e LP token supported
    ///         by this contract.
    /// @param poolId The id of the sub token to get the name of, will be the expiry
    /// @return Returns the symbol of this token
    function symbol(uint256 poolId)
        external
        view
        override
        returns (string memory)
    {
        return (string(abi.encodePacked("LP: ", term.symbol(poolId))));
    }

    /// @notice Used to initialize the reserves of the pool for given poolIds.
    /// @param  poolId New poolId which will get supported by this pool, equal to bond expiry
    /// @param  underlyingIn Amount of tokens used to initialize the reserves.
    /// @param  timeStretch The fraction of a year to stretch by in 3 decimal ie [10.245 = 10245]
    /// @param  recipient Address which will receive the minted LP tokens.
    /// @param  maxTime The longest timestamp the oracle will hold, 0 and it will not be initialized
    /// @param  maxLength The most timestamps the oracle will hold
    /// @return mintedLpTokens No. of minted LP tokens amount for provided `poolIds`.
    function registerPoolId(
        uint256 poolId,
        uint256 underlyingIn,
        uint32 timeStretch,
        address recipient,
        uint16 maxTime,
        uint16 maxLength
    ) external returns (uint256 mintedLpTokens) {
        // Expired PTs are not supported.
        if (poolId <= block.timestamp) revert ElementError.TermExpired();
        // Should not be already initialized.
        if (totalSupply[poolId] != uint256(0))
            revert ElementError.PoolInitialized();
        // Make sure the timestretch is non-zero.
        if (timeStretch == uint32(0))
            revert ElementError.TimeStretchMustBeNonZero();
        // Make sure the provided bondsIn and amount are non-zero values.
        if (underlyingIn == 0) revert ElementError.UnderlyingInMustBeNonZero();
        // Transfer tokens from the user
        token.transferFrom(msg.sender, address(this), underlyingIn);
        // Make a deposit to the unlocked shares in the term for the user
        // The implied initial share price [ie mu] can be calculated using this
        (uint256 value, uint256 sharesMinted) = term.depositUnlocked(
            underlyingIn,
            0,
            0,
            address(this)
        );
        // We want to store the mu as an 18 point fraction
        uint256 mu = (_normalize(value)).divDown(_normalize(sharesMinted));
        // Initialize the reserves.
        _update(poolId, uint128(0), uint128(sharesMinted));
        // Initialize the oracle if this pool needs one
        if (maxTime > 0 || maxLength > 0) {
            _initializeBuffer(poolId, maxTime, maxLength);
        }
        // Add the timestretch into the mapping corresponds to the poolId.
        parameters[poolId] = SubPoolParameters(timeStretch, uint224(mu));
        // Mint LP tokens to the recipient.
        _mint(poolId, recipient, sharesMinted);
        // Return the minted LP
        return (sharesMinted);
    }

    //----------------------------------------- Trading functionality ------------------------------------------//

    /// @notice Allows the user to buy and sell bonds (ie PT) at an interest rate set by yield space AMM invariant.
    /// @param  poolId Expiration timestamp of the bond (,i.e PT).
    /// @param  amount Represents the amount of asset user wants to send to the pool [token for BUY_PT, bond/PT for SELL_PT]
    /// @param  minAmountOut  Minimum expected returns user is willing to accept if the output is less it will revert.
    /// @param  receiver   Address which receives the output of the trade
    /// @param  isBuy True if the caller intends to buy bonds, false otherwise
    /// @return outputAmount The amount out the receiver gets
    function tradeBonds(
        uint256 poolId,
        uint256 amount,
        uint256 minAmountOut,
        address receiver,
        bool isBuy
    ) external returns (uint256 outputAmount) {
        // No trade after expiration
        if (poolId <= block.timestamp) revert ElementError.TermExpired();

        // Read the cached reserves for the unlocked shares and bonds ,i.e. PT.
        Reserve memory cachedReserve = reserves[poolId];
        // Should check for the support with the pool.
        if (
            cachedReserve.shares == uint128(0) &&
            cachedReserve.bonds == uint128(0)
        ) revert ElementError.PoolNotInitialized();

        uint256 newShareReserve;
        uint256 newBondReserve;
        // Switch on buy vs sell case
        if (isBuy) {
            (newShareReserve, newBondReserve, outputAmount) = _buyBonds(
                poolId,
                amount,
                cachedReserve,
                receiver
            );
        } else {
            (newShareReserve, newBondReserve, outputAmount) = _sellBonds(
                poolId,
                amount,
                cachedReserve,
                receiver
            );
        }

        // Minimum amount check.
        if (outputAmount < minAmountOut)
            revert ElementError.ExceededSlippageLimit();

        // Updated reserves.
        _update(poolId, uint128(newBondReserve), uint128(newShareReserve));

        // Emit event for the offchain services.
        emit BondsTraded(poolId, receiver, isBuy, amount, outputAmount);
    }

    /// @notice Allows directly purchasing the yield token by having the AMM virtually sell PT
    ///         and locking shares to fulfill that trade.
    /// @param  poolId Expiration timestamp of the bond (,i.e PT) correspond to which YT got minted.
    /// @param  amount The number of PT to sell and the number of YT to expect out
    /// @param  recipient Destination at which newly minted YTs got transferred.
    /// @param  maxInput Maximum amount of underlying buyer wants to spend on this trade.
    function purchaseYt(
        uint256 poolId,
        uint256 amount,
        address recipient,
        uint256 maxInput
    ) external {
        // No trade after expiration
        if (poolId <= block.timestamp) revert ElementError.TermExpired();

        // Load reserves
        Reserve memory cachedReserve = reserves[poolId];
        // Should check for the support with the pool.
        if (
            cachedReserve.shares == uint128(0) &&
            cachedReserve.bonds == uint128(0)
        ) revert ElementError.PoolNotInitialized();

        // Load the current price per share
        uint256 pricePerShare = term.unlockedSharePrice();

        // First we calculate how many shares would be outputted from selling 'amount' of PT
        (
            uint256 newShareReserve,
            uint256 newBondReserve,
            uint256 outputShares
        ) = _quoteSaleAndFees(poolId, amount, cachedReserve, pricePerShare);

        // Then we see how many underlying this would be worth, which is how many
        // PT would be minted if it was deposited
        uint256 saleUnderlying = (outputShares * pricePerShare) / _one;
        // Because of fees and slippage 'saleUnderlying' is not enough to mint PT for the user
        // they must pay the differential
        uint256 underlyingOwed = amount - saleUnderlying;
        // We check this is not more than the user slippage bound
        if (underlyingOwed > maxInput)
            revert ElementError.ExceededSlippageLimit();

        // We transfer this amount from the user
        token.transferFrom(msg.sender, address(this), underlyingOwed);

        // Now to give the user their PT we create it from the unlocked shares in the pool
        // and from the amount sent from the user.
        uint256[] memory ids = new uint256[](1);
        ids[0] = _UNLOCKED_TERM_ID;
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = outputShares;
        (uint256 pt, uint256 yt) = term.lock(
            ids,
            amounts,
            underlyingOwed,
            false,
            // The caller's recipient gets the yield tokens and the amm gets the PT
            recipient,
            address(this),
            block.timestamp,
            poolId
        );
        // Make sure that the generated PTs are equal to
        /// TODO: The rounding errors might make this check fail
        if (pt != amount) revert ElementError.InaccurateUnlockShareTrade();

        // Update the oracle
        _updateOracle(poolId, newShareReserve, newBondReserve);
        // Updated reserves.
        _update(poolId, uint128(newBondReserve), uint128(newShareReserve));
        // Todo update oracle
        emit YtPurchased(poolId, recipient, yt, underlyingOwed);
    }

    //----------------------------------------- Governance functionality ------------------------------------------//

    /// @notice Update the `tradeFee` using the governance contract.
    function updateTradeFee(uint128 newTradeFee) external onlyOwner {
        // change the state
        tradeFee = newTradeFee;
    }

    /// @notice Update the `governanceFeePercent` using the governance contract.
    function updateGovernanceFeePercent(uint128 newFeePercent)
        external
        onlyOwner
    {
        // change the state
        governanceFeePercent = newFeePercent;
    }

    /// @notice Governance can authorize an address to collect fees from the pools
    /// @param poolId The pool to collect the fees from
    /// @param destination The address to send the fees too
    function collectFees(uint256 poolId, address destination)
        external
        onlyAuthorized
    {
        // Load the fees for this pool
        CollectedFees memory fees = governanceFees[poolId];
        // Send the fees out to the destination
        // Note - the pool id for LP is the same as the PT id in term
        term.transferFrom(
            poolId,
            address(this),
            destination,
            uint256(fees.feesInBonds)
        );
        // Send shares out, we choose to not unwrap them so governance can
        // earn interest and unwrap many at once
        term.transferFrom(
            _UNLOCKED_TERM_ID,
            address(this),
            destination,
            uint256(fees.feesInShares)
        );
        // Reset the fees to be zero
        governanceFees[poolId] = CollectedFees(0, 0);
    }

    //----------------------------------------- Internal functionality ------------------------------------------//

    /// @dev Transfers from user, deposits into yield source, calculates trade, then
    ///      sends the output bonds to the user. Takes a fee on implied interest and gives
    ///      a percent of it to gov.
    /// @param  poolId The pool id for the trade
    /// @param  amount Amount of underlying asset (or base asset) provided to purchase the bonds.
    /// @param  cachedReserve Cached reserve at the time of trade.
    /// @param  receiver The address which gets the bonds
    /// @return The state of the reserve of shares after the trade
    /// @return The state of the bond reserve after the trade.
    /// @return The amount sent to the caller
    function _buyBonds(
        uint256 poolId,
        uint256 amount,
        Reserve memory cachedReserve,
        address receiver
    )
        internal
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        // Transfer the funds to the contract
        token.transferFrom(msg.sender, address(this), amount);

        // We deposit into the unlocked position of the term in order to calculate
        // the price per share and therefore implied interest rate.
        // NOTE - valuePaid != amount because it's possible to pre-fund the deposit
        //        by transferring to the term contract.
        (uint256 valuePaid, uint256 addedShares) = term.depositUnlocked(
            amount,
            0,
            0,
            address(this)
        );

        // Calculate the normalized price per share
        uint256 normalizedPricePerShare = (_normalize(valuePaid)).divDown(
            _normalize(addedShares)
        );
        // Calculate the amount of bond tokens.
        uint256 changeInBonds = _tradeCalculation(
            poolId,
            _normalize(addedShares),
            _normalize(uint256(cachedReserve.shares)),
            _normalize(uint256(cachedReserve.bonds)),
            normalizedPricePerShare,
            true
        );

        // Calculate the implied yield fee as the interest earned
        uint256 impliedInterest = changeInBonds - valuePaid;
        // Get the fee for the LP
        // Note - Fee percent are stored as 18 point fractions
        uint256 totalFee = (impliedInterest * tradeFee) / FixedPointMath.ONE_18;
        // Calculate shares to gov
        uint256 govFee = (totalFee * governanceFeePercent) /
            FixedPointMath.ONE_18;
        // Set into state the fees paid
        governanceFees[poolId].feesInBonds += uint128(govFee);

        // Do the actual bond transfer
        term.transferFrom(
            poolId,
            address(this),
            receiver,
            changeInBonds - totalFee
        );

        // Calculate the new reserves
        // The new share reserve is the added shares plus current and
        uint256 newShareReserve = cachedReserve.shares + addedShares;
        // the new bonds reserve is the current - change + (totalFee - govFee)
        uint256 newBondReserve = cachedReserve.bonds -
            changeInBonds +
            (totalFee - govFee);

        // Update oracle
        _updateOracle(poolId, newShareReserve, newBondReserve);

        // The trade output is changeInBonds - total fee
        // Returns the new reserves and the trade output
        return (newShareReserve, newBondReserve, changeInBonds - totalFee);
    }

    /// @dev Facilitate the sell of bond tokens. Transfer from the user and then withdraw
    ///      the produced shares to their address
    /// @param  poolId The id for the pool which the trade is made in
    /// @param  amount Amount of bonds tokens user wants to sell in given trade.
    /// @param  cachedReserve Cached reserve at the time of trade.
    /// @param  receiver Address which would receive the underlying token.
    /// @return The share reserve after trade, the bond reserve after trade and shares output
    function _sellBonds(
        uint256 poolId,
        uint256 amount,
        Reserve memory cachedReserve,
        address receiver
    )
        internal
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        // Transfer the bonds to the contract
        IMultiToken(address(term)).transferFrom(
            poolId,
            msg.sender,
            address(this),
            amount
        );
        // Load the unlocked price per share [ie c in modified yield space]
        uint256 pricePerShare = term.unlockedSharePrice();

        // Calls an internal function which quotes a sale and updates fees
        (
            uint256 newShareReserve,
            uint256 newBondReserve,
            uint256 outputShares
        ) = _quoteSaleAndFees(poolId, amount, cachedReserve, pricePerShare);

        // Updates the oracle
        _updateOracle(poolId, newShareReserve, newBondReserve);

        // The user amount is outputShares - shareFee and we withdraw to them
        // Create the arrays for a withdraw from term
        uint256[] memory ids = new uint256[](1);
        ids[0] = _UNLOCKED_TERM_ID;
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = outputShares;
        // Do the withdraw to user account
        uint256 valueSent = term.unlock(receiver, ids, amounts);

        return (newShareReserve, newBondReserve, valueSent);
    }

    /// @notice Helper function to calculate sale and fees for a sell, plus update the fee state.
    /// @dev Unlike the buy flow we use this logic in both 'purchaseYt' and '_sellBonds' and so abstract
    ///      it into a function.
    ///      WARN - Do not allow calling this function outside the context of a trade
    /// @param  poolId Pool Id supported for the trade.
    /// @param  amount Amount of bonds tokens user wants to sell in given trade.
    /// @param  cachedReserve Cached reserve at the time of trade.
    /// @param  pricePerShare The the ratio which converts shares to underlying
    /// @return (the new share reserve, the new bond reserve, shares produced)
    function _quoteSaleAndFees(
        uint256 poolId,
        uint256 amount,
        Reserve memory cachedReserve,
        uint256 pricePerShare
    )
        internal
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        // Calculate the amount of bond tokens which are produced
        uint256 outputShares = _tradeCalculation(
            poolId,
            _normalize(amount),
            _normalize(uint256(cachedReserve.shares)),
            _normalize(uint256(cachedReserve.bonds)),
            _normalize(pricePerShare),
            false
        );

        // Charge a fee on the implied interest rate
        // First convert the shares to underlying value
        uint256 shareValue = (outputShares * pricePerShare) / _one;
        // Now the implied interest is the difference between shareValue
        // and bond face value
        uint256 impliedInterest = amount - shareValue;
        // Calculate total fee with the multiplier which is an 18 point fraction
        uint256 fee = (impliedInterest * uint256(tradeFee)) /
            FixedPointMath.ONE_18;
        // Divide the fee value by the price per share to get the fee in shares
        uint256 shareFee = (fee * _one) / pricePerShare;
        // The governance percent is the this times by the 18 point governance percent
        // fraction
        uint256 governanceFee = (shareFee * uint256(governanceFeePercent)) /
            FixedPointMath.ONE_18;
        // Change the state to account for this fee
        // WARN - Do not allow calling this function outside the context of a trade
        governanceFees[poolId].feesInShares += uint128(governanceFee);
        // The LP fee is the difference between what's paid in total and what's paid to gov
        uint256 lpFee = shareFee - governanceFee;

        // The updated share reserve is the current reserve minus the output plus the lp fee.
        // The new bond reserve is the current plus input.
        // Amount out is the amount the user got
        return (
            uint256(cachedReserve.shares) - outputShares + lpFee,
            uint256(cachedReserve.bonds) + amount,
            outputShares - shareFee
        );
    }

    /// @dev Update the reserves after the trade or whenever the LP is minted.
    /// @param  poolId The pool id of the pool's reserves to be updated
    /// @param  newBondBalance current holdings of the bond tokens,i.e. PTs of the contract.
    /// @param  newSharesBalance current holding of the shares tokens by the contract.
    function _update(
        uint256 poolId,
        uint128 newBondBalance,
        uint128 newSharesBalance
    ) internal {
        // Update the reserves.
        reserves[poolId].bonds = newBondBalance;
        reserves[poolId].shares = newSharesBalance;
        emit Sync(poolId, newBondBalance, newSharesBalance);
    }

    /// @dev Updates the oracle and calculates the correct ratio
    /// @param poolId the ID of which pool's oracle to update
    /// @param newShareReserve the new share reserve
    /// @param newBondReserve the new bond reserve
    function _updateOracle(
        uint256 poolId,
        uint256 newShareReserve,
        uint256 newBondReserve
    ) internal {
        // NOTE - While the oracle prevent updates to un-initialized buffers this logic makes several sloads
        //        so by checking the initialization before calling into the oracle we optimize for gas.
        if (_buffers[poolId].length != 0) {
            // normalize Shares
            uint256 normalizedShare = _normalize(newShareReserve);
            // Load mu, will be stored normalized so no need to update
            uint256 mu = uint256(parameters[poolId].mu);
            uint256 muTimesShares = mu.mulDown(normalizedShare);
            // Note - The additional total supply factor from the yield space paper, it redistributes
            //        the liquidity from the inaccessible part of the curve.
            uint256 adjustedNormalizedBonds = _normalize(newBondReserve) +
                _normalize(totalSupply[poolId]);
            // The pool ratio is (bonds)/(mu * shares)
            uint256 oracleRatio = adjustedNormalizedBonds.divDown(
                muTimesShares
            );

            _updateBuffer(poolId, uint224(oracleRatio));
        }
    }

    /// @dev In this function all inputs should be _normalized and the output will
    ///      be 18 point
    /// @param expiry the expiration time == pool ID for lp pool
    /// @param input Token or shares in terms of the decimals of the token
    /// @param shareReserve Shares currently help in terms of decimals of the token
    /// @param bondReserve Bonds (PT) held by the pool in terms of the token
    /// @param pricePerShare The output token for each input of a share
    /// @param isBondOut true if the input is shares, false if the input is bonds
    function _tradeCalculation(
        uint256 expiry,
        uint256 input,
        uint256 shareReserve,
        uint256 bondReserve,
        uint256 pricePerShare,
        bool isBondOut
    ) internal view returns (uint256) {
        // Load the mu and time stretch
        SubPoolParameters memory params = parameters[expiry];
        // Normalize the seconds till expiry into 18 point
        uint256 timeToExpiry = (expiry - block.timestamp) *
            FixedPointMath.ONE_18;
        // Express this as a fraction of seconds in year
        timeToExpiry = timeToExpiry / (_ONE_YEAR);
        // Get an 18 point fraction of 1/(time stretch)
        // Note - Because params.timestretch is in 3 point decimal
        //        we have to divide that out in the constant (10^18 * 10^3 = 10^21)
        uint256 timestretch = 1e21 / uint256(params.timestretch);
        // Calculate the total supply, and _normalize
        uint256 totalSupply = _normalize(totalSupply[expiry]);
        uint256 mu = uint256(params.mu);
        // We adjust the bond reserve by a factor of totalSupply*mu
        // This reserve adjustment works by increasing liquidity which interest rates are positive
        // so that when the reserve has zero bonds on (on init) the curve thinks it has equal bonds and
        // underlying.
        uint256 totalSupplyTimesMu = totalSupply.mulDown(mu);

        // Call our internal price library
        uint256 result = YieldSpaceMath.calculateOutGivenIn(
            shareReserve,
            bondReserve,
            totalSupplyTimesMu,
            input,
            timeToExpiry,
            timestretch,
            pricePerShare,
            mu,
            isBondOut
        );

        // Return the output
        return _denormalize(result);
    }

    function _normalize(uint256 input) internal view returns (uint256) {
        if (decimals < 18) {
            unchecked {
                uint256 adjustFactor = 10**(18 - decimals);
                return input * adjustFactor;
            }
        } else {
            return input;
        }
    }

    function _denormalize(uint256 input) internal view returns (uint256) {
        if (decimals < 18) {
            unchecked {
                uint256 adjustFactor = 10**(18 - decimals);
                return input / adjustFactor;
            }
        } else {
            return input;
        }
    }
}
