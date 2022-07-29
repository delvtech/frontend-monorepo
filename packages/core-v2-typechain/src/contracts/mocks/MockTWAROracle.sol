// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

import "../libraries/TWAROracle.sol";

contract MockTWAROracle is TWAROracle {
    function initializeBuffer(
        uint256 bufferId,
        uint16 maxTime,
        uint16 maxLength
    ) public {
        _initializeBuffer(bufferId, maxTime, maxLength);
    }

    function updateBuffer(uint256 bufferId, uint224 price) public {
        _updateBuffer(bufferId, price);
    }
}
