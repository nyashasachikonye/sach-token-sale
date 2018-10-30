pragma solidity ^0.4.23;

contract SachToken {
  //state variable
  //N.B: solidity gives us a free getter function to retun the total supply.
  uint256 public totalSupply;
  //constructor
  function SachToken() public {
    totalSupply = 1000000;
  }
  //set total number of tokens
  //read the total number of tokens

}
