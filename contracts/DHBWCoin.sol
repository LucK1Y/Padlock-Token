pragma solidity ^0.5.8;

contract DHBWCoin {
  mapping (address => uint256) private _balances;
  mapping (address => mapping (address => uint256)) private _allowances;
  uint256 private _totalSupply;

  constructor() public {
    _totalSupply = 10000;
    _balances[msg.sender] = _totalSupply;
  }

  function name() public pure returns (string memory) {
    return "DHBWCoin";
  }

  function symbol() public pure returns (string memory) {
    return "DHBW";
  }

  function decimals() public pure returns (uint8) {
    return 2;
  }

  function totalSupply() public view returns (uint256) {
    return _totalSupply;
  }

  function balanceOf(address account) public view returns (uint256) {
    return _balances[account];
  }

  function transfer(address recipient, uint256 amount) public returns (bool) {
    return transferFrom(msg.sender, recipient, amount);
  }

  function approve(address spender, uint256 amount) public returns (bool) {
    _allowances[msg.sender][spender] = amount;
    return true;
  }

  function allowance(address owner, address spender) public view returns (uint256) {
    return _allowances[owner][spender];
  }

  function transferFrom(address owner, address recipient, uint256 amount) public returns (bool) {
    if (_balances[owner] - amount < 0) {
      revert("Sender does not have enough coins");
    }
    _balances[owner] -= amount;
    _balances[recipient] += amount;
    return true;
  }
}
