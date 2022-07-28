// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    uint8 private immutable _decimals;

    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_
    ) ERC20(name_, symbol_) {
        _decimals = decimals_;
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }

    function setBalance(address destination, uint256 amount) external {
        _burn(destination, balanceOf(destination));
        _mint(destination, amount);
        emit Transfer(address(0), destination, amount);
    }

    function uncheckedTransfer(address destination, uint256 amount) external {
        _mint(destination, amount);
        emit Transfer(address(0), destination, amount);
    }

    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }
}
