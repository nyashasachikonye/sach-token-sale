pragma solidity ^0.4.23;

contract SachToken {
  //N.B: solidity gives us a free getter function to retun the total supply.
  uint256 public totalSupply;
  //constructor
  function SachToken(uint256 _initialSupply) public {
    totalSupply = _initialSupply;
  }
}
