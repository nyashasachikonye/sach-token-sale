var SachToken = artifacts.require("./SachToken.sol");
var SachTokenSale = artifacts.require("./contracts/SachTokenSale.sol");
var totalSupply = 1e6;
var tokenPrice = 1e15;

module.exports = function(deployer) {
  deployer.deploy(SachToken, totalSupply).then(function() {
    return deployer.deploy(SachTokenSale, SachToken.address, tokenPrice);
  });
};
