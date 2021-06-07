pragma solidity ^0.4.17;

contract DappToken {
    string public name;
    string public symbol;
    string public standard = 'DApp Token v1.0';

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    function DappToken(uint256 _initialSupply) public {
      name = 'DApp Token';
      symbol = 'DAPP';
      totalSupply = _initialSupply;

        //allocate the initial supply
        balanceOf[msg.sender] = totalSupply;
    }

    event Transfer(
      address indexed _from,
      address indexed _to,
      uint256 _value
    );

    function transfer(address _to, uint256 _value) public returns (bool success) {
      //check if account doesn't have enough
      require (balanceOf[msg.sender] >= _value);

      //transfer the balance
      balanceOf[msg.sender] -= _value;
      balanceOf[_to] += _value;

      //transfer event
      Transfer(msg.sender, _to, _value);

      // return bool
      return true;
    }
}
