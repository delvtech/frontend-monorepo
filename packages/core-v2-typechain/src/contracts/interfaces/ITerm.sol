// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

import "./IMultiToken.sol";
import "./IERC20.sol";

interface ITerm is IMultiToken {
    /// @notice sums inputs to create new PTs and YTs from the deposit amount
    /// @param internalAmount how much of each asset to burn
    /// @param internalAssets an array of token IDs
    /// @param expiration the expiration timestamp
    /// @return a tuple of the number of PTs and YTs created
    function lock(
        uint256[] memory internalAmount,
        uint256[] memory internalAssets,
        uint256 underlyingAmount,
        bool hasPreFunding,
        address ytDestination,
        address ptDestination,
        uint256 ytBeginDate,
        uint256 expiration
    ) external returns (uint256, uint256);

    function depositUnlocked(
        uint256 underlyingAmount,
        uint256 ptAmount,
        uint256 ptId,
        address destination
    ) external returns (uint256, uint256);

    /// @notice removes all PTs and YTS input
    /// @param destination the address to send unlocked tokens to
    /// @param tokenIDs the IDs of the tokens to unlock
    /// @param amount the amount to unlock
    /// @return the total value of the tokens that have been unlocked
    function unlock(
        address destination,
        uint256[] memory tokenIDs,
        uint256[] memory amount
    ) external returns (uint256);

    function unlockedSharePrice() external view returns (uint256);

    function token() external view returns (IERC20);
}
