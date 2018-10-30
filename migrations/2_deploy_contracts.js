var SachToken = artifacts.require("./SachToken.sol");

module.exports = function(deployer) {
  deployer.deploy(SachToken, 1000000);
};
