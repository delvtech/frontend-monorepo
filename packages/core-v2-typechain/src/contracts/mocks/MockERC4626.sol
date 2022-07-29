// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC4626 is ERC4626 {
    uint8 private immutable _decimals;

    constructor(ERC20 _asset)
        ERC20("MockERC4626 Token", "xERC4626")
        ERC4626(_asset)
    {
        _decimals = _asset.decimals();
    }

    function decimals()
        public
        view
        override(ERC20, IERC20Metadata)
        returns (uint8)
    {
        return _decimals;
    }
}
