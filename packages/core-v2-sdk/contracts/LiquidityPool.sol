// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LiquidityPool {
  ERC20 public poolToken;
  ERC20 public token;

  uint256 public tokenBalance;
  uint256 public cryptoBalance;

  uint256 public constant MANTISSA = 1e18;

  event Deposit(address user, uint256 value, uint256 tokenAmount);
  event BuyTokens(address user, uint256 value, uint256 tokenAmount);
  event SellTokens(address user, uint256 value, uint256 tokenAmount);

  constructor(ERC20 _poolToken, ERC20 _token) {
    poolToken = _poolToken;
    token = _token;
  }

  function deposit(uint256 tokenAmount) public payable {
    require(token.transferFrom(msg.sender, address(this), tokenAmount));

    if (tokenBalance == 0 && cryptoBalance == 0) {
      tokenBalance = tokenAmount;
      cryptoBalance = msg.value;

      emit Deposit(msg.sender, msg.value, tokenAmount);

      return;
    }

    uint256 tokenDepositAmount = (((tokenBalance * MANTISSA) / cryptoBalance) *
      msg.value) / MANTISSA;

    require(tokenDepositAmount <= tokenAmount);

    tokenBalance += tokenDepositAmount;
    cryptoBalance += msg.value;

    emit Deposit(msg.sender, msg.value, tokenDepositAmount);

    if (tokenDepositAmount < tokenAmount)
      token.transfer(msg.sender, tokenAmount - tokenDepositAmount);
  }

  function getTokenPrice() public view returns (uint256) {
    return (cryptoBalance * MANTISSA) / tokenBalance;
  }

  function buyTokens() public payable {
    uint256 amount = msg.value;

    uint256 tokenAmount = tokenBalance -
      (tokenBalance * cryptoBalance) /
      (cryptoBalance + amount);

    tokenBalance -= tokenAmount;
    cryptoBalance += amount;

    require(token.transfer(msg.sender, tokenAmount));

    emit BuyTokens(msg.sender, msg.value, tokenAmount);
  }

  function sellTokens(uint256 tokenAmount) public {
    require(token.transferFrom(msg.sender, address(this), tokenAmount));

    uint256 amount = cryptoBalance -
      (tokenBalance * cryptoBalance) /
      (tokenBalance + tokenAmount);

    tokenBalance += tokenAmount;
    cryptoBalance -= amount;

    payable(msg.sender).transfer(amount);

    emit SellTokens(msg.sender, amount, tokenAmount);
  }
}
