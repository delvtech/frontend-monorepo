// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.15;

import "./Term.sol";
import "./MultiToken.sol";
import "./interfaces/ICompoundV3.sol";

/// Docs: https://c3-docs.compound.finance/
contract CompoundV3Term is Term {
    /// Compound address
    ICompoundV3 public immutable yieldSource;

    /// Accumulates the inferred amount of invested shares of underlying by this contract
    uint256 public yieldSharesIssued;

    /// See ERC4626.sol
    uint128 private _underlyingReserve;
    uint128 private _yieldShareReserve;

    /// See ERC4626.sol
    uint256 public immutable maxReserve;
    uint256 public immutable targetReserve;

    /// @notice Associates the Compound contract to the protocol and sets
    ///         reserve limits
    /// @param _yieldSource Address of the Compoundv3 implementation
    /// @param _linkerCodeHash The hash of the erc20 linker contract deploy code
    /// @param _factory The factory which is used to deploy the linking contracts
    /// @param _maxReserve Upper bound of underlying which can be held in the
    ///                    reserve
    /// @param _owner this address will be made owner
    /// @dev Also sets the targetReserve to be a half of the maxReserve.
    constructor(
        address _yieldSource,
        bytes32 _linkerCodeHash,
        address _factory,
        uint256 _maxReserve,
        address _owner
    )
        Term(
            _linkerCodeHash,
            _factory,
            IERC20(ICompoundV3(_yieldSource).baseToken()),
            _owner
        )
    {
        yieldSource = ICompoundV3(_yieldSource);
        maxReserve = _maxReserve;
        targetReserve = _maxReserve / 2;
        token.approve(address(_yieldSource), type(uint256).max);
    }

    /// @notice Deposits underlying into the Compound pool and issues shares
    /// @param _state The context designation of the resulting shares
    /// @return Returns a tuple of number of shares and the value of those
    ///         shares in underlying
    function _deposit(ShareState _state)
        internal
        override
        returns (uint256, uint256)
    {
        return
            _state == ShareState.Locked ? _depositLocked() : _depositUnlocked();
    }

    /// @notice Deposits underlying directly into Compound and issues "shares"
    ///         1:1 with the amount of vaultShares returned
    /// @return shares Amount of shares issued
    /// @return underlying Underlying value of shares issued
    function _depositLocked()
        internal
        returns (uint256 shares, uint256 underlying)
    {
        /// Underlying the user has deposited is calculated by getting the
        /// differential balance of the contract and the reserve of underlying
        underlying =
            token.balanceOf(address(this)) -
            uint256(_underlyingReserve);

        /// `accruedUnderlying` is the amount of underlying deposited and the
        /// interest accrued on those deposits
        uint256 accruedUnderlying = yieldSource.balanceOf(address(this));

        /// Deposits `underlying` into Compound
        yieldSource.supply(address(token), underlying);

        /// Initial case where `shares` are valued 1:1 with underlying
        if (accruedUnderlying == 0) {
            yieldSharesIssued += underlying;
            return (underlying, underlying);
        }

        /// shares here represent "yieldShares" and "lockedShares".
        /// shares or "yieldShares" must be a constant representation of a
        /// growing amount of underlying. Compound accounts for yield in a
        /// rebasing mechanism and so we must infer to calculate claims of
        /// depositors for this system
        shares = (yieldSharesIssued * underlying) / accruedUnderlying;

        /// Increments "yieldShares"
        yieldSharesIssued += shares;
    }

    /// @notice Deposits underlying either directly into the `underlyingReserve`
    ///         or does a rebalancing of the `underlyingReserve` into the
    ///         `yieldShareReserve`
    /// @return shares Amount of shares issued
    /// @return underlying Underlying value of shares issued
    function _depositUnlocked()
        internal
        returns (uint256 shares, uint256 underlying)
    {
        /// See reserveDetails()
        (
            uint256 underlyingReserve_,
            uint256 yieldShareReserve_,
            ,
            uint256 impliedUnderlyingReserve,
            uint256 accruedUnderlying
        ) = reserveDetails();

        /// Underlying is calculated by getting the differential balance of the
        /// contract and the reserve of underlying.
        underlying = token.balanceOf(address(this)) - underlyingReserve_;

        /// Shares in the "Unlocked" context are a claim on the underlying in
        /// the `underlyingReserve` and the redeemable value in underlying of
        /// the `yieldShareReserve`
        if (impliedUnderlyingReserve == 0) {
            /// This is primarily the initial case and implies that the
            /// `underlyingReserve` and `yieldShareReserve` are 0. Therefore
            /// `shares` are issued 1:1 with the amount of `underlying`
            shares = underlying;
        } else {
            /// In the general case, we can price `shares` relative to the ratio
            /// of total issued shares to the `underlyingReserve` + underlying
            /// value of the `yieldShareReserve`
            shares =
                (underlying * totalSupply[UNLOCKED_YT_ID]) /
                impliedUnderlyingReserve;
        }

        /// Precomputed sum of `underlyingReserve` and deposited `underlying`
        uint256 proposedUnderlyingReserve = underlyingReserve_ + underlying;

        /// Accounting of the reserves when depositing works as follows:

        /// - When the sum of the `underlyingReserve` and deposited `underlying`
        /// exceeds the maxReserve limit a rebalancing must occur, swapping
        /// all but a `targetReserve` amount of `underlying` for `yieldShares`.

        /// - The case where the `maxReserve` limit is not exceeded, no deposit to
        /// Compound occurs.

        /// We can expect across multiple consecutive deposits through either
        /// of these code paths that the reserve of underlying to float between
        /// `targetReserve` and `maxReserve` while the reserve of `yieldShares`
        /// should increase over time
        if (proposedUnderlyingReserve > maxReserve) {
            /// Differential amount of underlying to account for leaving at
            /// minimum a `targetReserve` amount of underlying
            uint256 underlyingToBeSupplied = proposedUnderlyingReserve -
                targetReserve;

            /// Internalised representation of shares on this contracts deposits
            /// to Compound
            uint256 underlyingToBeSuppliedAsYieldShares = (yieldSharesIssued *
                underlyingToBeSupplied) / accruedUnderlying;

            /// Deposits `underlying` into Compound
            yieldSource.supply(address(token), underlyingToBeSupplied);

            /// Account for issued shares
            yieldSharesIssued += underlyingToBeSuppliedAsYieldShares;

            /// Sets the `underlyingReserve` to `targetReserve` amount
            /// and increments the amount of yieldShares in the
            /// `yieldShareReserve` with the amount of yieldShares calculated
            /// relative to the amount supplied
            _setReserves(
                targetReserve,
                yieldShareReserve_ + underlyingToBeSuppliedAsYieldShares
            );
        } else {
            /// We set the `underlyingReserve` to the precomputed sum of
            /// underlying deposited and existing `underlyingReserve`. The
            /// reserve of `yieldShares` are unchanged
            _setReserves(proposedUnderlyingReserve, yieldShareReserve_);
        }
    }

    /// @notice Withdraws underlying from Compound
    /// @param _shares Amount of "shares" user will redeem for underlying
    /// @param _dest Address underlying will be sent to
    /// @param _state The context designation of the shares
    /// @return Returns the amount of underlying redeemed for amount of shares
    function _withdraw(
        uint256 _shares,
        address _dest,
        ShareState _state
    ) internal override returns (uint256) {
        return
            _state == ShareState.Locked
                ? _withdrawLocked(_shares, _dest)
                : _withdrawUnlocked(_shares, _dest);
    }

    /// @notice Withdraws underlying directly from Compound using
    ///         "shares" which are directly proportional to "yieldShares"
    /// @param _shares Amount of "shares" user will redeem for underlying
    /// @param _dest Address underlying will be sent to
    /// @return underlying Returns the amount of underlying redeemed for amount
    ///         of shares
    function _withdrawLocked(uint256 _shares, address _dest)
        internal
        returns (uint256 underlying)
    {
        /// Calculates how much `underlying` the `_shares` are worth
        uint256 underlying = yieldSharesAsUnderlying(_shares);

        /// Withdraw `underlying` from Compound
        yieldSource.withdrawTo(_dest, address(token), underlying);

        /// Redeem back the `yieldShares`
        yieldSharesIssued -= _shares;
    }

    /// @notice Withdraws an amount of underlying from either the
    ///         `underlyingReserve` or by redeeming a portion of the
    ///         `yieldShareReserve` for more underlying
    /// @param _shares Amount of "shares" user will redeem for underlying
    /// @param _dest Address underlying will be sent to
    /// @return underlying Returns the amount of underlying redeemed for amount
    ///         of shares
    function _withdrawUnlocked(uint256 _shares, address _dest)
        internal
        returns (uint256 underlying)
    {
        /// See reserveDetails()
        (
            uint256 underlyingReserve_,
            uint256 yieldShareReserve_,
            uint256 yieldShareReserveAsUnderlying,
            uint256 impliedUnderlyingReserve,
            uint256 accruedUnderlying
        ) = reserveDetails();

        /// Underlying due to the user is calculated relative to the ratio of
        /// the `underlyingReserve` + underlyingValue of the `yieldShareReserve`
        /// and the total supply of shares issued.

        /// NOTE: There is an accounting caveat here as the `_shares` amount has
        /// been previously burned from the shares totalSupply. This must be
        /// accounted for so shares are redeemed in the correct ratio
        underlying =
            (_shares * impliedUnderlyingReserve) /
            (_shares + totalSupply[UNLOCKED_YT_ID]);

        /// Accounting of the reserves when withdrawing works as follows:

        /// 1) When the underlying due to the user is less than or equal to
        /// `underlyingReserve`, that amount is transferred directly from the
        /// reserve to the user.

        /// 2) If the amount of underlying due to the user is greater than the
        /// underlyingReserve, the logic breaks into two further cases:
        ///   2.1) If the amount of underlying due is greater than the
        ///        underlying value of the `yieldShareReserve`, the entire
        ///        `yieldShareReserve` is redeemed directly from Compound
        ///        for an amount of underlying, effectively removing all
        ///        underlying from accruing yield.
        ///        The underlying due to the user is then taken from the sum of
        ///        underlying redeemed from the `yieldShareReserve` and the
        ///        `underlyingReserve`
        ///   2.2) If the amount of underlying due is less than or equal to
        ///        the underlying value of the `yieldShareReserve`, the
        ///        underlying due is withdrawn directly from Compound
        ///        removing `yieldShares` from the `yieldShareReserve`. The
        ///        underlyingReserve in this instance is left untouched
        if (underlying <= underlyingReserve_) {
            /// Deducts amount of underlying due from `underlyingReserve`
            _setReserves(underlyingReserve_ - underlying, yieldShareReserve_);

            /// Transfers underlying due to `_dest`
            token.transfer(_dest, underlying);
        } else {
            /// Check if underlying value of yieldShareReserve can cover the
            /// amount of underlying due to the user
            if (underlying > yieldShareReserveAsUnderlying) {
                /// Redeem all of the `yieldShareReserve` from Compound
                yieldSource.withdraw(
                    address(token),
                    yieldShareReserveAsUnderlying
                );

                /// Transfer underlying due to `_dest`
                token.transfer(_dest, underlying);

                /// Account for yieldShares being redeemed
                yieldSharesIssued -= yieldShareReserve_;

                /// As we have checked implicitly `underlying` is greater than
                /// `underlyingRedeemed`, it is assumed that the
                /// `yieldShareReserve` is empty and any remaining underlying
                /// due is covered by the `underlyingReserve`.
                _setReserves(
                    underlyingReserve_ -
                        (underlying - yieldShareReserveAsUnderlying),
                    0
                );
            } else {
                /// Internalised representation for shares of this contract's deposits
                /// to Compound and the interest accrued to them
                uint256 underlyingAsYieldShares = (yieldSharesIssued *
                    underlying) / accruedUnderlying;

                /// Withdraws `underlying`
                yieldSource.withdrawTo(_dest, address(token), underlying);

                /// Account for yieldShares being redeemed
                yieldSharesIssued -= underlyingAsYieldShares;

                /// The `underlyingReserve` is unchanged. Deducts `yieldShares`
                /// redeemed by the withdrawal from the `vaultShareReserve`
                _setReserves(
                    underlyingReserve_,
                    yieldShareReserve_ - underlyingAsYieldShares
                );
            }
        }
    }

    /// @notice Converts shares between respective "ShareStates", exchanging
    ///         by accounting internally how much underlying both are worth
    /// @param _state The ShareState the shares will be converted from
    /// @param _shares Amount of "shares" user will redeem for underlying
    /// @return Amount of "shares" of the opposite ShareState which is
    ///         exchanged for
    function _convert(ShareState _state, uint256 _shares)
        internal
        override
        returns (uint256)
    {
        return
            _state == ShareState.Locked
                ? _convertLocked(_shares)
                : _convertUnlocked(_shares);
    }

    /// @notice Converts "locked" shares into "unlocked" shares
    /// @param _lockedShares Amount of "locked" shares to be exchanged
    /// @return unlockedShares Amount of "unlocked" shares exchanged for
    function _convertLocked(uint256 _lockedShares)
        internal
        returns (uint256 unlockedShares)
    {
        /// See reserveDetails()
        (
            uint256 underlyingReserve_,
            uint256 yieldShareReserve_,
            ,
            uint256 impliedUnderlyingReserve,
            uint256 accruedUnderlying
        ) = reserveDetails();

        /// Calculates how much underlying the internal representation of
        /// "yieldShares" are worth
        uint256 lockedSharesAsUnderlying = (accruedUnderlying * _lockedShares) /
            yieldSharesIssued;

        /// Computes the value of "unlocked" shares for the underlying value of
        /// the "locked" shares
        unlockedShares =
            (lockedSharesAsUnderlying * totalSupply[UNLOCKED_YT_ID]) /
            impliedUnderlyingReserve;

        /// The `yieldShares` representing the "locked" shares already exist on
        /// the contract so the `yieldShareReserve` is incremented with the
        /// amount of `_lockedShares`
        _setReserves(underlyingReserve_, yieldShareReserve_ + _lockedShares);
    }

    /// @notice Converts "unlocked" shares into "locked" shares
    /// @param _unlockedShares Amount of "unlocked" shares which will be exchanged
    /// @return lockedShares Amount of "locked" shares exchanged for
    function _convertUnlocked(uint256 _unlockedShares)
        internal
        returns (uint256 lockedShares)
    {
        /// See reserveDetails()
        (
            uint256 underlyingReserve_,
            uint256 yieldShareReserve_,
            ,
            uint256 impliedUnderlyingReserve,
            uint256 accruedUnderlying
        ) = reserveDetails();

        /// NOTE: There is an accounting caveat here as the `_unlockedShares`
        /// amount has been previously burned from the shares totalSupply. This
        /// must be accounted for so shares are redeemed in the correct ratio
        uint256 unlockedSharesAsUnderlying = (_unlockedShares *
            impliedUnderlyingReserve) /
            (_unlockedShares + totalSupply[UNLOCKED_YT_ID]);

        /// Compute the value of "locked" shares using the underlying value of
        /// the "unlocked" shares
        lockedShares =
            (yieldSharesIssued * unlockedSharesAsUnderlying) /
            accruedUnderlying;

        /// Check if enough `lockedShares`/`yieldShares` are in the `yieldShareReserve`
        require(lockedShares <= yieldShareReserve_, "not enough vault shares");

        /// Deduct `lockedShares` from the `yieldShareReserve`
        _setReserves(underlyingReserve_, yieldShareReserve_ - lockedShares);
    }

    /// @notice Calculates the underlying value of the shares in either
    ///         ShareState
    /// @param _shares Amount of "shares" to be valued
    /// @param _state The "ShareState" of the `_shares`
    /// @return The underlying value of `_shares`
    function _underlying(uint256 _shares, ShareState _state)
        internal
        view
        override
        returns (uint256)
    {
        /// When pricing "locked" shares, `_shares` are directly analogous to
        /// `yieldShares` and so we can price them as if they were

        /// In the "unlocked" context, `_shares` are priced relative to the ratio
        /// of the `impliedUnderlying` and the totalSupply of "unlocked" shares
        if (_state == ShareState.Locked) {
            return yieldSharesAsUnderlying(_shares);
        } else {
            (, , , uint256 impliedUnderlyingReserve, ) = reserveDetails();
            return
                (_shares * impliedUnderlyingReserve) /
                totalSupply[UNLOCKED_YT_ID];
        }
    }

    /// @notice Helper function for retrieving information about the reserves
    /// @return underlyingReserve_ The amount of underlying accounted for in
    ///         `_underlyingReserve`
    /// @return yieldShareReserve_ The amount of yieldShares accounted for in
    ///         `_yieldShareReserve`
    /// @return yieldShareReserveAsUnderlying The underlying value of the
    ///         yieldShareReserve
    /// @return impliedUnderlyingReserve The sum of the `underlyingReserve`
    ///         and the underlying value of the `vaultShareReserve`. The total
    ///         "unlocked" shares are a proportional claim on this amount of
    ///         underlying
    /// @return accruedUnderlying The sum of deposits of underlying by this
    ///         contract to Compound and the interest which has accrued on
    ///         them
    function reserveDetails()
        public
        view
        returns (
            uint256 underlyingReserve_,
            uint256 yieldShareReserve_,
            uint256 yieldShareReserveAsUnderlying,
            uint256 impliedUnderlyingReserve,
            uint256 accruedUnderlying
        )
    {
        /// Retrieve both reserves.
        (underlyingReserve_, yieldShareReserve_) = (
            uint256(_underlyingReserve),
            uint256(_yieldShareReserve)
        );

        /// Get balance of underlying which can be redeemed from Compound by
        /// this contract
        accruedUnderlying = yieldSource.balanceOf(address(this));

        /// Compute the underlying value of the `yieldShareReserve`
        yieldShareReserveAsUnderlying =
            (accruedUnderlying * yieldShareReserve_) /
            yieldSharesIssued;

        /// Compute the implied underlying value of both reserves
        impliedUnderlyingReserve = (underlyingReserve_ +
            yieldShareReserveAsUnderlying);
    }

    /// @notice Calculates the yieldShare value for an amount of underlying
    /// @return yieldShares `YieldShares` is an internal and inferred constant
    ///         time representation of a depositors claim of a growing pool of
    ///         deposited underlying by this contract in the Compound protocol.
    ///         The rationale to do so is due to Compounds non-constant
    ///         representation of "share" balances being directly the underlying
    ///         deposited + the interest accrued. Integrations with this
    ///         protocol must represent shares in a fixed amount so we infer
    ///         this artificially using `yieldSharesIssued`
    function underlyingAsYieldShares(uint256 underlying)
        public
        view
        returns (uint256 yieldShares)
    {
        yieldShares =
            (yieldSharesIssued * underlying) /
            yieldSource.balanceOf(address(this));
    }

    /// @notice Calculates the underlying value for an amount of yieldShares
    /// @return underlying The token yield is denominated in
    function yieldSharesAsUnderlying(uint256 yieldShares)
        public
        view
        returns (uint256 underlying)
    {
        underlying =
            (yieldSource.balanceOf(address(this)) * yieldShares) /
            yieldSharesIssued;
    }

    /// @notice Setter function which overwrites the reserve values
    /// @param _newUnderlyingReserve the new underlyingReserve amount
    /// @param _newYieldShareReserve the new yieldShareReserve amount
    function _setReserves(
        uint256 _newUnderlyingReserve,
        uint256 _newYieldShareReserve
    ) internal {
        _underlyingReserve = uint128(_newUnderlyingReserve);
        _yieldShareReserve = uint128(_newYieldShareReserve);
    }
}
