// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

import "../interfaces/IYieldAdapter.sol";
import "./MockERC20YearnVault.sol";
import "../Term.sol";

contract MockYieldAdapter is IYieldAdapter, Term {
    MockERC20YearnVault public immutable vault;

    constructor(
        address mockYearnVault,
        address governance,
        bytes32 _linkerCodeHash,
        address _factory,
        IERC20 _token
    ) Term(_linkerCodeHash, _factory, _token, governance) {
        vault = MockERC20YearnVault(mockYearnVault);
        token.approve(address(vault), type(uint256).max);
    }

    function mint(
        uint256 tokenID,
        address to,
        uint256 amount
    ) public {
        _mint(tokenID, to, amount);
        uint256 expiry = uint256(uint128(tokenID));
        sharesPerExpiry[expiry] += amount;
    }

    function setSharesPerExpiry(uint256 expiry, uint256 amount) public {
        sharesPerExpiry[expiry] = amount;
    }

    /// Deposits based on funds available in the contract.
    /// @return tuple (shares minted, amount underlying used)
    function _deposit(ShareState state)
        internal
        override
        returns (uint256, uint256)
    {
        uint256 amount = token.balanceOf(address(this));
        uint256 shares;
        if (amount > 0) {
            shares = vault.deposit(amount, address(this));
        }

        uint256 returnShares = state == ShareState.Unlocked
            ? shares * 2
            : shares;

        return (returnShares, amount);
    }

    /// Turns unlocked shares into locked shares and vice versa
    function _convert(ShareState state, uint256 shares)
        internal
        pure
        override
        returns (uint256)
    {
        uint256 conversion = state == ShareState.Unlocked
            ? shares * 2
            : shares / 2;
        return conversion;
    }

    /// @return the amount produced
    function _withdraw(
        uint256 shares,
        address destination,
        ShareState state
    ) internal override returns (uint256) {
        if (state == ShareState.Unlocked) {
            shares = shares / 2;
        }
        return (vault.withdraw(shares, destination, 10000));
    }

    /// @return The amount of underlying the input is worth
    function _underlying(uint256 shares, ShareState state)
        internal
        view
        override
        returns (uint256)
    {
        uint256 amount = (vault.pricePerShare() * shares) / one;
        if (state == ShareState.Unlocked) {
            amount = amount / 2;
        }
        return amount;
    }

    // This is for testing
    function lockedSharePrice() public view returns (uint256) {
        return (vault.pricePerShare() / one);
    }

    function setBalance(
        uint256 poolId,
        address who,
        uint256 amount
    ) public {
        balanceOf[poolId][who] = amount;
    }
}
