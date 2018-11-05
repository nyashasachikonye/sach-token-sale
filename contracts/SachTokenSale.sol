pragma solidity ^0.4.2;
import "./SachToken.sol";

contract SachTokenSale {
  //private instance variables
  address admin; //external account to manage over the contract (not marked as public cause we dont want to expose this!)
  //public instance variables
  SachToken public tokenContract; //? - function that will give the address of the SachToken to be set inside the constructor
  uint256 public tokenPrice;
  uint256 public tokensSold;

  event Sell(address _buyer, uint256 _amount);

  constructor(SachToken _tokenContract, uint256 _tokenPrice) public {
      //assign admin (does things like end sale) to be the person who deployed the contract
      admin = msg.sender;
      //token contract
      tokenContract = _tokenContract;
      //token price
      tokenPrice = _tokenPrice;
  }

  //referencing an external library to handle the multiplication (price determination of the tokens)
  //multipy : function used to perform safe mulitplications
  function multiply(uint x, uint y) internal pure returns (uint z) {
    require(y == 0 || (z = x * y) / y == x);
  }

  function buyTokens(uint256 _numberOfTokens) public payable {
    //msg.value is the amount of wei that the payable fucntion is being called with by msg.sender

    //payable marker indicates that addresses are able to send ETH via a transaction
    //require they are given the correct number of tokens for the purchased token price
    require(msg.value == multiply(_numberOfTokens,tokenPrice));

    //require that there are still enough tokens
    require(tokenContract.balanceOf(this) >= _numberOfTokens);

    //keep track of number of tokens sold
    tokensSold += _numberOfTokens;

    //require that transfer is successful (? - emits a transfer event) // the actual BUY fuctionality
    require(tokenContract.transfer(msg.sender, _numberOfTokens));

    //emit a sell event
    emit Sell(msg.sender, _numberOfTokens);
  }

  //ending the SachToken Sale
  function endSale() public {
    //require that only an admin can do this
    require(msg.sender == admin);
    //transfer the remaining tokens in the sale back to the admin
    /*require(tokenContract.transfer(admin, tokenContract.balanceOf(this)));*/ // this line is causing errors!

    //destroy the contract
    /*selfdestruct(admin);*/ // this wasnt used eventually
    /*admin.transfer(address(this).balance);*/
  }
}
