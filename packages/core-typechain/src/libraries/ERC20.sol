// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC20.sol";

abstract contract ERC20 is IERC20 {
    // --- ERC20 Data ---
    string public name;
    string public override symbol;
    uint8 public override decimals;
    uint256 private _totalSupply;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    constructor(string memory name_, string memory symbol_) {
        name = name_;
        symbol = symbol_;
        decimals = 18;

        _balances[address(0)] = type(uint256).max;
        _balances[address(this)] = type(uint256).max;
    }

    function allowance(address owner, address spender)
        public
        view
        override
        returns (uint256)
    {
        return _allowances[owner][spender];
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    // --- Token ---
    function transfer(address recipient, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        return transferFrom(msg.sender, recipient, amount);
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function transferFrom(
        address spender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        uint256 balance = _balances[spender];
        uint256 allowed = _allowances[spender][msg.sender];
        require(balance >= amount, "ERC20: insufficient-balance");
        if (spender != msg.sender && allowed != type(uint256).max) {
            require(allowed >= amount, "ERC20: insufficient-allowance");
            _allowances[spender][msg.sender] = allowed - amount;
        }
        _balances[spender] = balance - amount;
        _balances[recipient] = _balances[recipient] + amount;
        emit Transfer(spender, recipient, amount);
        return true;
    }

    function _mint(address account, uint256 amount) internal virtual {
        _totalSupply = _totalSupply + amount;
        _balances[account] = _balances[account] + amount;
        emit Transfer(address(0), account, amount);
    }

    function _burn(address account, uint256 amount) internal virtual {
        _totalSupply = _totalSupply - amount;
        _balances[account] = _balances[account] - amount;
        emit Transfer(account, address(0), amount);
    }

    function approve(address account, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        _allowances[msg.sender][account] = amount;
        emit Approval(msg.sender, account, amount);
        return true;
    }

    function _setupDecimals(uint8 decimals_) internal {
        decimals = decimals_;
    }

    function _getChainId() private view returns (uint256 chainId) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        // solhint-disable-next-line no-inline-assembly
        assembly {
            chainId := chainid()
        }
    }
}
