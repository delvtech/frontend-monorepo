// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

import "./LP.sol";
import "./libraries/FixedPointMath.sol";
import "./libraries/YieldSpaceMath.sol";
import "./interfaces/IMultiToken.sol";
import "./interfaces/ITerm.sol";

contract Pool is LP {
    // Lets us use the fixed point math library as calls
    using FixedPointMath for uint256;

    /// Trade type the contract support.
    enum TradeType {
        BUY_PT,
        SELL_PT,
        BUY_SHARES
    }

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
        TradeType indexed tradeType,
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

    /// Modifier to verify whether the msg.sender is governance contract or not.
    modifier onlyGovernance() {
        require(msg.sender == governanceContract, "todo nice errors");
        _;
    }

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
    ) LP(_token, _term, _erc20ForwarderCodeHash, _erc20ForwarderFactory) {
        // Should not be zero.
        require(_governanceContract != address(0), "todo nice errors");

        //----------------Perform some sstore---------------------//
        tradeFee = uint128(_tradeFee);
        governanceContract = _governanceContract;
    }

    /// @notice Returns the name of the sub token i.e LP token supported
    ///         by this contract.
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
    /// @param  timeStretch No. of seconds in our timescale.
    /// @param  recipient Address which will receive the minted LP tokens.
    /// @return mintedLpTokens No. of minted LP tokens amount for provided `poolIds`.
    function registerPoolId(
        uint256 poolId,
        uint256 underlyingIn,
        uint32 timeStretch,
        address recipient
    ) external returns (uint256 mintedLpTokens) {
        // Expired PTs are not supported.
        require(poolId > block.timestamp, "todo nice time errors");
        // Should not be already initialized.
        require(totalSupply[poolId] == uint256(0), "todo nice errors");
        // Make sure the timestretch is non-zero.
        require(timeStretch > uint32(0), "todo nice errors");
        // Make sure the provided bondsIn and amount are non-zero values.
        require(underlyingIn > 0, "todo nice errors");
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
        uint256 mu = (_normalize(sharesMinted)).divDown(_normalize(value));
        // Initialize the reserves.
        _update(poolId, uint128(0), uint128(sharesMinted));
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
    /// @param  amountOut  Minimum expected returns user is willing to accept if the output is less it will revert.
    /// @param  receiver   Address which receives the output of the trade
    /// @param  tradeType  BUY_PT if the user wants to buy or SELL_PT if the user wants to sell PT
    /// @return outputAmount The amount out the receiver gets
    function tradeBonds(
        uint256 poolId,
        uint256 amount,
        uint256 amountOut,
        address receiver,
        TradeType tradeType
    ) external returns (uint256 outputAmount) {
        // No trade after expiration
        require(poolId > block.timestamp, "Todo nice time error");

        // Read the cached reserves for the unlocked shares and bonds ,i.e. PT.
        Reserve memory cachedReserve = reserves[poolId];
        // Should check for the support with the pool.
        require(
            cachedReserve.shares != uint128(0) ||
                cachedReserve.bonds != uint128(0),
            "todo nice init error"
        );

        uint256 newShareReserve;
        uint256 newBondReserve;
        // Switch on buy vs sell case
        if (tradeType == TradeType.BUY_PT) {
            (newBondReserve, newShareReserve, amountOut) = _buyBonds(
                poolId,
                amount,
                cachedReserve,
                receiver
            );
        } else {
            (newBondReserve, newShareReserve, amountOut) = _sellBonds(
                poolId,
                amount,
                cachedReserve,
                receiver
            );
        }

        // Minimum amount check.
        require(outputAmount >= amountOut, "todo nice errors");

        // Updated reserves.
        _update(poolId, uint128(newBondReserve), uint128(newShareReserve));

        // TODO - Update oracle

        // Emit event for the offchain services.
        emit BondsTraded(poolId, receiver, tradeType, amount, outputAmount);
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
        require(poolId > block.timestamp, "Todo nice time error");
        // Load reserves
        Reserve memory cachedReserve = reserves[poolId];
        // Should check for the support with the pool.
        require(
            cachedReserve.shares != uint128(0) ||
                cachedReserve.bonds != uint128(0),
            "todo nice init error"
        );

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
        require(underlyingOwed <= maxInput, "todo: nice slippage error");
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
        require(pt == amount, "todo nice error");
        // Updated reserves.
        _update(poolId, uint128(newBondReserve), uint128(newShareReserve));
        // Todo update oracle
        emit YtPurchased(poolId, recipient, yt, underlyingOwed);
    }

    //----------------------------------------- Governance functionality ------------------------------------------//

    /// @notice Update the `tradeFee` using the governance contract.
    function updateTradeFee(uint128 newTradeFee) external onlyGovernance {
        // change the state
        tradeFee = newTradeFee;
    }

    /// @notice Update the `governanceFeePercent` using the governance contract.
    function updateGovernanceFeePercent(uint128 newFeePercent)
        external
        onlyGovernance
    {
        // change the state
        governanceFeePercent = newFeePercent;
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

        // Calculate the amount of bond tokens.
        uint256 changeInBonds = _tradeCalculation(
            poolId,
            _normalize(addedShares),
            _normalize(uint256(cachedReserve.shares)),
            _normalize(uint256(cachedReserve.bonds)),
            (_normalize(valuePaid)).divDown(_normalize(addedShares)),
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

        // The output is changeInBonds - total fee
        // The new share reserve is the added shares plus current and
        // the new bonds reserve is the current - change + (totalFee - govFee)
        return (
            cachedReserve.bonds - changeInBonds + (totalFee - govFee),
            cachedReserve.shares + addedShares,
            changeInBonds - totalFee
        );
    }

    /// @dev Facilitate the sell of bond tokens.
    /// It will transfer the underlying token instead of the shares ??
    /// @param  poolId Pool Id supported for the trade.
    /// @param  amount Amount of bonds tokens user wants to sell in given trade.
    /// @param  cachedReserve Cached reserve at the time of trade.
    /// @param  receiver Address which would receive the underlying token.
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
    /// @dev Unlike the buy flow we use this logic in both 'buyYt' and '_sellBonds' and so abstract
    ///      it into a function.
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
        // The fee in shares is the percent of share value that is fee times shares
        uint256 shareFee = (shareValue * fee) / shareValue;
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
    /// @param  poolId Sub pool Id, Corresponds to it reserves get updated.
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

    /// @dev In this function all inputs should be _normalized and the output will
    ///      be 18 point
    /// @param poolId the pool id == expiration time
    /// @param input Token or shares in terms of the decimals of the token
    /// @param shareReserve Shares currently help in terms of decimals of the token
    /// @param bondReserve Bonds (PT) held by the pool in terms of the token
    /// @param pricePerShare The output token for each input of a share
    /// @param isBondOut true if the input is shares, false if the input is bonds
    function _tradeCalculation(
        uint256 poolId,
        uint256 input,
        uint256 shareReserve,
        uint256 bondReserve,
        uint256 pricePerShare,
        bool isBondOut
    ) internal view returns (uint256) {
        // Load the mu and time stretch
        SubPoolParameters memory params = parameters[poolId];
        // Normalize the seconds till expiry into 18 point
        uint256 timeToExpiry = (poolId - block.timestamp) *
            FixedPointMath.ONE_18;
        // Express this as a fraction of seconds in year
        timeToExpiry = timeToExpiry / (_ONE_YEAR);
        // Get an 18 point fraction of 1/(time stretch)
        // Note - Because params.timestretch is in 3 point decimal
        //        we have to divide that out in the constant (10^18 * 10^3 = 10^21)
        uint256 timestretch = 1e21 / uint256(params.timestretch);
        // Calculate the total supply, and _normalize
        uint256 totalSupply = _normalize(totalSupply[poolId]);

        // Call our internal price library
        uint256 result = YieldSpaceMath.calculateOutGivenIn(
            shareReserve,
            bondReserve,
            totalSupply,
            input,
            timeToExpiry,
            timestretch,
            pricePerShare,
            params.mu,
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
