pragma solidity ^0.4.2;
import "./SachToken.sol";

contract SachTokenSale {
  //private instance variables
  address admin; //external account to manage over the contract (not marked as public cause we dont want to expose this!)
  //public instance variables
  SachToken public tokenContract; //? - function that will give the address of the SachToken to be set inside the constructor
  uint256 public tokenPrice;

  constructor(SachToken _tokenContract, uint256 _tokenPrice) public {
      //assign admin (does things like end sale) to be the person who deployed the contract
      admin = msg.sender;
      //token contract
      tokenContract = _tokenContract;
      //token price
      tokenPrice = _tokenPrice;

  }
}
