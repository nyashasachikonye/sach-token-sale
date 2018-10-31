pragma solidity ^0.4.23;

contract SachToken {

  //add a name
  string public name = "SachToken";
  //add a symbol
  string public symbol = "XCH";

  //N.B: solidity gives us a free getter function to retun the total supply.
  uint256 public totalSupply;

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );

  mapping (address => uint256) public balanceOf;

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

}
