// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

interface IPool {
    function trade(
        uint256 amountIn,
        bool baseIn,
        uint256 poolId,
        uint256 minAmountOut,
        address destination
    ) external returns (uint256 amountOut);

    function quote(
        uint256 amountIn,
        bool baseIn,
        uint256 poolId
    ) external view returns (uint256 amountOut);

    function virtualPrincipalSale(
        uint256 soldAmount,
        uint256 poolId,
        uint256 maxAmountIn,
        address destination
    ) external returns (uint256 basePaid, uint256 ytBought);

    function joinPool(
        uint256 amountBond,
        uint256 amountBase,
        uint256 poolId,
        address destination
    ) external returns (uint256 lpOut);

    function exitPool(
        uint256 lpOut,
        uint256 poolId,
        address destination
    ) external returns (uint256 baseOut, uint256 bondOut);

    function rollover(
        uint256 lpAmount,
        uint256 inputPoolId,
        uint256 outputPoolId
    ) external returns (uint256 baseOut, uint256 bondOut);
}
