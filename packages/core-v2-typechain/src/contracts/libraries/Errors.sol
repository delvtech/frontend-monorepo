/// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

library ElementError {
    /// ###############
    /// ### General ###
    /// ###############
    error TermExpired();
    error TermNotExpired();
    error TermNotInitialized();
    error PoolInitialized();
    error PoolNotInitialized();
    error ExceededSlippageLimit();
    error RestrictedZeroAddress();
    error ExpiredDeadline();
    error InvalidSignature();

    /// ##################
    /// ### MultiToken ###
    /// ##################
    error InvalidERC20Bridge();
    error BatchInputLengthMismatch();

    /// ############
    /// ### Term ###
    /// ############
    error UnsortedAssetIds();
    error NotAYieldTokenId();
    error ExpirationDateMustBeNonZero();
    error StartDateMustBeNonZero();
    error InvalidYieldTokenCreation();
    error IncongruentPrincipalAndYieldTokenIds();
    error VaultShareReserveTooLow();

    /// ############
    /// ### Pool ###
    /// ############
    error TimeStretchMustBeNonZero();
    error UnderlyingInMustBeNonZero();
    error InaccurateUnlockShareTrade();

    /// ##################
    /// ### TWAROracle ###
    /// ##################
    error TWAROracle_IncorrectBufferLength();
    error TWAROracle_BufferAlreadyInitialized();
    error TWAROracle_MinTimeStepMustBeNonZero();
    error TWAROracle_IndexOutOfBounds();
    error TWAROracle_NotEnoughElements();

    /// ######################
    /// ### FixedPointMath ###
    /// ######################
    error FixedPointMath_AddOverflow();
    error FixedPointMath_SubOverflow();
    error FixedPointMath_InvalidExponent();
    error FixedPointMath_NegativeOrZeroInput();
    error FixedPointMath_NegativeInput();

    /// #####################
    /// ### Authorizable ####
    /// #####################
    error Authorizable_SenderMustBeOwner();
    error Authorizable_SenderMustBeAuthorized();
}
