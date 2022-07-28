// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

import "./MultiToken.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/ITerm.sol";
import "./interfaces/IYieldAdapter.sol";

// LP is a multitoken [ie fake 1155] contract which accepts deposits and withdraws
// from the AMM.
contract LP is MultiToken {
    // The token standard indexes each token by an ID which for these LP
    // tokens will be the expiration time of the token which matures.
    // Deposits input the underlying asset and a proportion will be locked
    // till expiry to match the current ratio of the pool

    // Holds the reserve amounts in a gas friendly way
    struct Reserve {
        uint128 shares;
        uint128 bonds;
    }

    // Maps pool ID to the reserves for that term
    mapping(uint256 => Reserve) public reserves;
    // The term address cannot be changed after deploy.
    // All funds are held in the term contract.
    ITerm public immutable term;
    // The underlying token on which yield is earned
    IERC20 public immutable token;
    uint8 public immutable decimals;
    // one expressed in the native token math
    uint256 internal immutable _one;

    // The id for the unlocked deposit into the term, this is YT at expiry and start time 0
    uint256 internal constant _UNLOCKED_TERM_ID = 1 << 255;

    /// @notice Runs the initial deployment code
    /// @param _token The token which is deposited into this contract
    /// @param _term The term which locks and earns yield on token
    /// @param _linkerCodeHash The hash of the erc20 linker contract deploy code
    /// @param _factory The factory which is used to deploy the linking contracts
    constructor(
        IERC20 _token,
        ITerm _term,
        bytes32 _linkerCodeHash,
        address _factory
    ) MultiToken(_linkerCodeHash, _factory) {
        token = _token;
        uint8 _decimals = _token.decimals();
        decimals = _decimals;
        _one = 10**_decimals;
        term = _term;
    }

    /// @notice Accepts a deposit from an LP in terms of the underlying and deposit it into the yield
    ///         source then locks the correct proportion to match pool. The YT from the locked amount
    ///         is credited to the user. This is the main user friendly way of depositing.
    /// @param amount The amount of underlying tokens to deposit
    /// @param poolId The identifier of the LP pool to deposit into, in this version it's expiration time.
    /// @param destination The destination which gets credited with LP token.
    /// @param minOutput The call will revert if the caller does not receive at least this many LP token.
    /// @return The shares created.
    function depositUnderlying(
        uint256 amount,
        uint256 poolId,
        address destination,
        uint256 minOutput
    ) external returns (uint256) {
        // No minting after expiration
        require(poolId > block.timestamp, "Todo nice time error");
        // Transfer from the user
        token.transferFrom(msg.sender, address(this), amount);
        // We deposit into the unlocked position of the term in order to calculate
        // the price per share and therefore implied interest rate.
        // This is the step that deposits all value provided into the yield source
        // Note - we need a pointless storage to memory to convince the solidity type checker
        // to understand the type of []
        (uint256 valueDeposited, uint256 depositedShares) = term
            .depositUnlocked(amount, 0, 0, address(this));

        // Calculate the implicit price per share
        uint256 pricePerShare = (valueDeposited * _one) / depositedShares;
        // Call internal function to mint new lp from the new shares held by this contract
        uint256 newLpToken = _depositFromShares(
            poolId,
            uint256(reserves[poolId].shares),
            uint256(reserves[poolId].bonds),
            depositedShares,
            pricePerShare,
            destination
        );
        // Check enough has been made and return that amount
        require(newLpToken >= minOutput, "Todo nice errors");
        return (newLpToken);
    }

    /// @notice Allows a user to deposit an equal amount of bonds and yielding shares to match reserves.
    ///         Naturally unfriendly and should be called in weiroll bundle.
    /// @param poolId The identifier of the LP pool to deposit into, in this version it's expiration time.
    /// @param bondsDeposited The number of principal tokens deposited, this will set the ratio and
    ///                    the correct reserve matching percent of shares will be transferred from the user
    /// @param destination The address which will be credited with shares
    /// @param minLpOut This call will revert if the LP produced is not at least this much
    /// @return The shares created.
    function depositBonds(
        uint256 poolId,
        uint256 bondsDeposited,
        address destination,
        uint256 minLpOut
    ) external returns (uint256) {
        // No minting after expiration
        require(poolId > block.timestamp, "Todo nice time error");
        // Load the pool details
        uint256 loadedShares = uint256(reserves[poolId].shares);
        uint256 loadedBonds = uint256(reserves[poolId].bonds);
        // Transfer the pt from the user
        term.transferFrom(poolId, msg.sender, address(this), bondsDeposited);
        // Calculate ratio of the shares needed
        uint256 sharesNeeded = (loadedShares * bondsDeposited) / loadedBonds;
        // Transfer shares from user
        term.transferFrom(
            _UNLOCKED_TERM_ID,
            msg.sender,
            address(this),
            sharesNeeded
        );
        // Calculate Lp
        uint256 lpCreated = (totalSupply[poolId] * bondsDeposited) /
            loadedBonds;
        // Mint LP
        _mint(poolId, destination, lpCreated);
        // Update the reserve state
        reserves[poolId].shares = uint128(loadedShares + sharesNeeded);
        reserves[poolId].bonds = uint128(loadedBonds + bondsDeposited);
        // Check enough has been made and return that amount
        require(lpCreated >= minLpOut, "Todo nice errors");
        return (lpCreated);
    }

    /// @notice Withdraws LP from the pool, resulting in either a proportional withdraw before expiration
    ///         or a withdraw of only underlying afterwards.
    /// @param poolId The id of the LP token to withdraw
    /// @param amount The number of LP tokens to remove
    /// @param destination The address to credit the underlying to.
    function withdraw(
        uint256 poolId,
        uint256 amount,
        address destination
    ) external {
        // Burn lp token and free assets. Will also finalize the pool and so return
        // zero for the userBonds if it's after expiry time.
        (uint256 userShares, uint256 userBonds) = _withdrawToShares(
            poolId,
            amount,
            msg.sender
        );

        // We've turned the LP into constituent assets and so now we transfer them to the user
        // By withdrawing shares and then (optionally) transferring PT to them

        // Create the arrays for a withdraw from term
        uint256[] memory ids = new uint256[](1);
        ids[0] = _UNLOCKED_TERM_ID;
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = userShares;
        // Do the withdraw to user account
        term.unlock(destination, ids, amounts);

        // Now if there are also bonds [ie if the pool is not yet expired we transfer to the user]
        if (userBonds != 0) {
            // We transfer directly to them
            term.transferFrom(poolId, address(this), msg.sender, userBonds);
        }
    }

    /// @notice Allows a user to withdraw from an expired term and then deposit into a new _one in _one transaction
    /// @param fromPoolId The identifier of the LP token which will be burned by this call
    /// @param toPoolId The identifier of the to LP token which will be created by this call
    /// @param amount The number of LP tokens to burn from the user
    /// @param destination The address which will be credited with the output
    /// @param minOutput The minimum number of new LP tokens created, otherwise will revert.
    /// @return The number of LP token created
    function rollover(
        uint256 fromPoolId,
        uint256 toPoolId,
        uint256 amount,
        address destination,
        uint256 minOutput
    ) external returns (uint256) {
        // Only expired bonds can be rolled over
        require(
            fromPoolId < block.timestamp && toPoolId > block.timestamp,
            "Todo nice time error"
        );
        // Burn lp token and free assets. Will also finalize the pool and so return
        // zero for the userBonds if it's after expiry time.
        (uint256 userShares, ) = _withdrawToShares(
            fromPoolId,
            amount,
            msg.sender
        );
        // In this case we have no price per share information so we must ask the pool for it
        uint256 pricePerShare = term.unlockedSharePrice();
        // Now the freed shares are deposited
        uint256 newLpToken = _depositFromShares(
            toPoolId,
            uint256(reserves[toPoolId].shares),
            uint256(reserves[toPoolId].bonds),
            userShares,
            pricePerShare,
            destination
        );
        // Require that the output matches user expectations
        require(newLpToken >= minOutput, "Todo nice expectation error");
        return (newLpToken);
    }

    /// @notice Should be called after a user has yielding shares from the term and needs to put them into
    ///         a term, such as when they rollover or when they deposit single sided.
    /// @param poolId The pool the user is depositing into
    /// @param currentShares The number of shares in the LP pool which is deposited to
    /// @param currentBonds The number of bonds in the LP pool which is deposited to
    /// @param depositedShares The number of yielding shares which the user has deposited
    /// @param pricePerShare A multiplier which converts yielding shares to their net value.
    /// @param to The address to credit the LP token to.
    /// @return The number of LP tokens created by this action
    function _depositFromShares(
        uint256 poolId,
        uint256 currentShares,
        uint256 currentBonds,
        uint256 depositedShares,
        uint256 pricePerShare,
        address to
    ) internal returns (uint256) {
        // Must be initialized
        // NOTE - There's a strong requirment for trades to not be able to move the pool to
        //        have a reserve of exactly 0 in either asset
        require(
            currentShares != 0 && currentBonds != 0,
            "todo nice initialization error"
        );
        // No deposits after expiry
        require(poolId > block.timestamp, "Todo nice time error");
        // Calculate total reserve with conversion to underlying units
        // IE: amount_bonds + amountShares*underlyingPerShare
        uint256 totalValue = currentShares * pricePerShare + currentBonds;
        // Calculate the needed bonds as a percent of the value
        uint256 depositedAmount = (depositedShares * pricePerShare) / _one;
        uint256 neededBonds = (depositedAmount * currentBonds) / totalValue;
        // The bond value is in terms of purely the underlying so to figure out how many shares we lock
        // we divide it by our price per share to convert to share value and convert it to 18 point
        uint256 sharesToLock = (neededBonds * _one) / pricePerShare;
        //  Lock shares to PTs while sending the resulting YT to the user

        // Note need to declare dynamic memory types in this way even with _one element
        uint256[] memory ids = new uint256[](1);
        ids[0] = _UNLOCKED_TERM_ID;
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = sharesToLock;
        // then make the call
        term.lock(
            ids,
            amounts,
            0,
            false,
            to,
            address(this),
            block.timestamp,
            // Note Pools Ids come from their PT expiry time
            poolId
        );

        // Mint new LP in equal proportion to the increase in shares
        uint256 increaseInShares = depositedShares - sharesToLock;
        uint256 newLpToken = (totalSupply[poolId] * increaseInShares) /
            currentShares;
        _mint(poolId, to, newLpToken);
        // Now we have increased the amount of shares and we have increased the number of bonds an equal proportion
        // So we change their state in storage
        // todo non optimal state use
        reserves[poolId].shares += uint128(increaseInShares);
        reserves[poolId].bonds += uint128(neededBonds);
        // Return the LP produced
        return (newLpToken);
    }

    /// @notice Deletes LP tokens from a user and then returns how many yielding shares and bonds are released
    ///         Will also finalize [meaning convert bonds to shares] a pool if it is expired.
    /// @param poolId The id of the LP token which is deleted from
    /// @param amount The number of LP tokens to remove
    /// @param source The address who's tokens will be deleted.
    /// @return userShares The number of shares and bonds the user should receive
    function _withdrawToShares(
        uint256 poolId,
        uint256 amount,
        address source
    ) internal returns (uint256 userShares, uint256 userBonds) {
        // Load the reserves
        uint256 reserveBonds = uint256(reserves[poolId].bonds);
        uint256 reserveShares = uint256(reserves[poolId].shares);

        // Two different cases, either the pool is expired and the user can get out the underlying
        // or the pool is not expired and the user can withdraw only bonds and underlying
        // So if the pool is expired and has not withdrawn then we must withdraw
        // Leverage that the poolId == expiration
        if (block.timestamp >= poolId && reserveBonds != 0) {
            // Create new unlocked shares from the expired PT
            (, uint256 sharesCreated) = term.depositUnlocked(
                0,
                reserveBonds,
                poolId,
                address(this)
            );
            // Now we update the cached reserves
            reserveBonds = 0;
            reserveShares += sharesCreated;
        }

        // Cache the total supply for withdraws
        uint256 cachedTotalSupply = totalSupply[poolId];
        // We burn here prevent some edge case chance of reentrancy
        _burn(poolId, source, amount);

        // Calculate share percent
        userShares = (amount * reserveShares) / cachedTotalSupply;
        // Update the cached reserves
        reserveShares -= userShares;

        // The user gets out a pure percent of the total supply
        userBonds = (amount * reserveBonds) / cachedTotalSupply;
        // Update the cached reserves
        reserveBonds -= userBonds;

        // Finally we update the state about this pool
        reserves[poolId].bonds = uint128(reserveBonds);
        reserves[poolId].shares = uint128(reserveShares);
    }
}
