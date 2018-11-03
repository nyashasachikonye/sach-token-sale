var SachToken = artifacts.require("./SachToken.sol");
var SachTokenSale = artifacts.require("./contracts/SachTokenSale.sol"); //note that this is fully defined unlike above
var totalSupply = 1e6; // total supply = 1 million tokens
var tokenPrice = 1e15; // token price = 1 quadrillion wei (0.001 ETH)
module.exports = function(deployer) {
  deployer.deploy(SachToken, totalSupply); //1  000 000 initial tokens created!
  deployer.deploy(SachTokenSale, SachToken.address, tokenPrice);
};
