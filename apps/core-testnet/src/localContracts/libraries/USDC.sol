// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/drafts/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract USDC is ERC20Permit {
    using SafeERC20 for IERC20;
    using Address for address;

    constructor(address sender)
        ERC20("USD Coin", "USDC")
        ERC20Permit("USD Coin")
    {
        _setupDecimals(6);
        mint(sender, 1e6 * 1000000);
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }
}
