pragma solidity ^0.4.23;

contract SachToken {
  //N.B: solidity gives us a free getter function to retun the total supply.
  uint256 public totalSupply;

  mapping (address => uint256) public balanceOf;

  //constructor
  constructor (uint256 _initialSupply) public {
    totalSupply = _initialSupply;
    //allocate the inital supply to admin account
    balanceOf[msg.sender] = _initialSupply;
  }
}
