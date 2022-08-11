// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

import "../Pool.sol";

contract MockPool is Pool {
    constructor(
        ITerm _term,
        IERC20 _token,
        uint256 _tradeFee,
        bytes32 _erc20ForwarderCodeHash,
        address _governanceContract,
        address _erc20ForwarderFactory
    )
        Pool(
            _term,
            _token,
            _tradeFee,
            _erc20ForwarderCodeHash,
            _governanceContract,
            _erc20ForwarderFactory
        )
    {}

    function setFees(
        uint256 poolId,
        uint128 feeShares,
        uint128 feeBond
    ) external {
        governanceFees[poolId] = CollectedFees(feeShares, feeBond);
    }
}
