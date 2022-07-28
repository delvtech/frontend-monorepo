// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

import "./ITerm.sol";

abstract contract IYieldAdapter is ITerm {
    /// Yield sources should have two share types, easily withdrawable unlocked shares and
    /// possibly hard to withdraw yield sources [only redeemed at expiry]
    enum ShareState {
        Locked,
        Unlocked
    }

    /// Deposits based on funds available in the contract.
    /// @return tuple (shares minted, amount underlying used)
    function _deposit(ShareState) internal virtual returns (uint256, uint256);

    /// Turns unlocked shares into locked shares and vice versa
    function _convert(ShareState, uint256) internal virtual returns (uint256);

    /// @return the amount produced
    function _withdraw(
        uint256,
        address,
        ShareState
    ) internal virtual returns (uint256);

    /// @return The amount of underlying the input is worth
    function _underlying(uint256, ShareState)
        internal
        view
        virtual
        returns (uint256);
}
