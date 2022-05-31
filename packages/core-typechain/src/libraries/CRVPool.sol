pragma solidity ^0.8.0;

interface CurveStethPool {
    function calc_withdraw_one_coin(uint256 _token_amount, int128 i)
        external
        view
        returns (uint256);
}
