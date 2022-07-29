// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

import "contracts/libraries/FixedPointMath.sol";

contract MockFixedPointMath {
    function add(uint256 x, uint256 y) public pure returns (uint256 result) {
        result = FixedPointMath.add(x, y);
    }

    function sub(uint256 x, uint256 y) public pure returns (uint256 result) {
        result = FixedPointMath.sub(x, y);
    }

    function pow(uint256 x, uint256 y) public pure returns (uint256 result) {
        result = FixedPointMath.pow(x, y);
    }

    function exp(int256 x) public pure returns (int256 result) {
        result = FixedPointMath.exp(x);
    }

    function ln(int256 x) public pure returns (int256 result) {
        result = FixedPointMath.ln(x);
    }
}
