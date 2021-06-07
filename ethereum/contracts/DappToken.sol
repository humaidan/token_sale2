pragma solidity ^0.4.17;

contract DappToken {
    string public name;
    string public symbol;
    string public standard = 'DApp Token v1.0';

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(
      address indexed _from,
      address indexed _to,
      uint256 _value
    );

    event Approve(
      address indexed _owner,
      address indexed _spender,
      address _value
    );

    function DappToken(uint256 _initialSupply) public {
      name = 'DApp Token';
      symbol = 'DAPP';
      totalSupply = _initialSupply;

        //allocate the initial supply
        balanceOf[msg.sender] = totalSupply;
    }

    //Main Transfer function
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

    //Delegated Transfer


    function approve(address _spender, uint256 _value) public returns (bool success) {
      //allowance
      allowance[msg.sender][_spender] = _value;
      Approve(msg.sender, _spender, _value);

      return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
      require(_value <= balanceOf[_from]); //_from has enough tokens
      require(_value <= allowance[_from][msg.sender]); // allowance is big enough

      // change balance
      balanceOf[_from] -= _value;
      balanceOf[_to] += _value;

      allowance[_from][msg.sender] -= _value;

      Transfer (_from, _to, _value);

      return true;
    }
}
