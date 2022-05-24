pragma solidity ^0.8.0;

interface CurveContract {
    function calc_withdraw_one_coin(uint256 token_amount, uint256 i)
        external
        view
        returns (uint256);
}
