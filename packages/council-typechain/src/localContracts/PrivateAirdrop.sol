// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface ILockingVault {
    /// @notice Deposits and delegates voting power to an address provided with the call
    /// @param fundedAccount The address to credit this deposit to
    /// @param amount The amount of token which is deposited
    /// @param firstDelegation First delegation address
    function deposit(
        address fundedAccount,
        uint256 amount,
        address firstDelegation
    ) external;
}

interface IPlonkVerifier {
    function verifyProof(bytes memory proof, uint256[] memory pubSignals)
        external
        view
        returns (bool);
}

/// @title An example airdrop contract utilizing a zk-proof of MerkleTree inclusion.
contract PrivateAirdrop is Ownable {
    using SafeERC20 for IERC20;
    IERC20 public airdropToken;
    uint256 public amountPerRedemption;
    IPlonkVerifier verifier;

    bytes32 public root;

    mapping(bytes32 => bool) public nullifierSpent;

    uint256 constant SNARK_FIELD =
        21888242871839275222246405745257275088548364400416034343698204186575808495617;

    ILockingVault public immutable vault;

    constructor(
        IERC20 _airdropToken,
        uint256 _amountPerRedemption,
        IPlonkVerifier _verifier,
        bytes32 _root,
        address _vault
    ) {
        airdropToken = _airdropToken;
        amountPerRedemption = _amountPerRedemption;
        verifier = _verifier;
        root = _root;
        vault = ILockingVault(_vault);
        // Give maximum allowance
        airdropToken.safeApprove(_vault, type(uint256).max);
    }

    /// @notice verifies the proof, collects the airdrop if valid, and prevents this proof from working again.
    function claimAirdropAndDelegate(
        bytes calldata proof,
        bytes32 nullifierHash,
        address delegate
    ) public {
        require(
            uint256(nullifierHash) < SNARK_FIELD,
            "Nullifier is not within the field"
        );
        require(!nullifierSpent[nullifierHash], "Airdrop already redeemed");

        uint256[] memory pubSignals = new uint256[](3);
        pubSignals[0] = uint256(root);
        pubSignals[1] = uint256(nullifierHash);
        pubSignals[2] = uint256(uint160(msg.sender));
        require(
            verifier.verifyProof(proof, pubSignals),
            "Proof verification failed"
        );

        nullifierSpent[nullifierHash] = true;
        vault.deposit(msg.sender, amountPerRedemption, delegate);
    }

    /// @notice Allows the owner to update the root of the merkle tree.
    /// @dev Function can be removed to make the merkle tree immutable. If removed, the ownable extension can also be removed for gas savings.
    function updateRoot(bytes32 newRoot) public onlyOwner {
        root = newRoot;
    }
}
