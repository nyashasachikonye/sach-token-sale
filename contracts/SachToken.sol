pragma solidity ^0.4.23;

contract SachToken {

  //add a name
  string public name = "SachToken";
  //add a symbol
  string public symbol = "XCH";

  //N.B: solidity gives us a free getter function to retun the total supply.
  uint256 public totalSupply;

  //transfer event
  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );
  //approve event
  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 _value
  );
  //transfer

  //balanceof : returns the amount of tokens for each address supplied. Keeps track of tokens and their owners.
  mapping (address => uint256) public balanceOf;

  //allowance : returns the mapping for each of the addresses that a particular owner has approved. For each of these approved addresses, the amount approved. Keeps track of the amount of tokens approved and to whom.
  mapping (address => mapping (address => uint256))public allowance;

  //constructor
  constructor (uint256 _initialSupply) public {
    totalSupply = _initialSupply;
    //allocate the inital supply to admin account
    balanceOf[msg.sender] = _initialSupply;
  }


  //Transfer
  function transfer(address _to, uint256 _value) public returns(bool success) {
    //Exception if account doesnt have enough
    require(balanceOf[msg.sender] >= _value);
    //Transfer balance
    balanceOf[msg.sender] -= _value;
    balanceOf[_to]+= _value;
    //Transfer Event
    emit Transfer(msg.sender, _to, _value);
    //Return an Boolean
    return true;
  }

  //approve a transfer  //balanceof : return the amount of tokens for each address supplied. Keeps track of tokens and their owners.
  function approve(address _spender, uint256 _value) public returns (bool success) {
    //allowance
    allowance[msg.sender][_spender] = _value;
    //Approve Event
    emit Approval(msg.sender, _spender, _value);
    //returnthe mapping for each of the addresses that a particular owner has approved. For each of these approved addresses, the amount approved. Keeps track of the amount of tokens approved and to whom. a boolean
    return true;
  }
  //transfer from
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    //require from account has enough tokens
    require(_value <= balanceOf[_from]);
    //require the allowance is big enough : cant transfer tokens more than the allowance
    require(_value <= allowance[_from][msg.sender]);
    //change the balance
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    //update the allowance
    allowance[_from][msg.sender] -= _value;
    //Transfer Event
    emit Transfer(_from, _to, _value);
    //return boolean
    return true;
  }

}
