// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./ERC20.sol";

contract DAI is ERC20 {
    constructor(address sender) ERC20("DAI stable coin", "DAI") {
        _setupDecimals(18);
        mint(sender, 1000000000000000000000000000000000000000);
    }

    function deposit() public payable {
        _mint(msg.sender, msg.value);
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function withdraw(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount);
        _burn(msg.sender, amount);
        payable(msg.sender).transfer(amount);
    }
}
