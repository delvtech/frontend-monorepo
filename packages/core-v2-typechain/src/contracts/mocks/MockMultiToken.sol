// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

import "../MultiToken.sol";

contract MockMultiToken is MultiToken {
    constructor(bytes32 _linkerCodeHash, address _factory)
        MultiToken(_linkerCodeHash, _factory)
    {}

    function setNameAndSymbol(
        uint256 tokenId,
        string calldata __name,
        string calldata __symbol
    ) external {
        _name[tokenId] = __name;
        _symbol[tokenId] = __symbol;
    }

    function setBalance(
        uint256 tokenId,
        address who,
        uint256 amount
    ) external {
        balanceOf[tokenId][who] = amount;
    }
}
