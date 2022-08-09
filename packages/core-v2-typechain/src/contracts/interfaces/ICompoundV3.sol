// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.15;

abstract contract ICompoundV3 {
    function supply(address asset, uint256 amount) external virtual;

    function withdraw(address asset, uint256 amount) external virtual;

    function withdrawTo(
        address to,
        address asset,
        uint256 amount
    ) external virtual;

    function baseToken() external view virtual returns (address);

    function balanceOf(address owner) public view virtual returns (uint256);
}
