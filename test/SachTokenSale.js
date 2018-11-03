var SachTokenSale = artifacts.require("./contracts/SachTokenSale.sol");

contract('SachTokenSale', function(accounts) {
  var tokenSaleInstance;
  var tokenPrice = 1e15; // 1 quadrillion wei (0.001 ETH)

  //initialisation tests
  it('initializes the contract with the correct values', function(){
    return SachTokenSale.deployed().then(function(instance) {
      tokenSaleInstance = instance;
      return tokenSaleInstance.address //return the address to which this particular contract (token sale contract) was deployed
    }).then(function(address) {
    assert.notEqual(address, 0x0, 'has contract address');
    return tokenSaleInstance.tokenContract(); //return the address of the token contract
  }).then(function(address){
    assert.notEqual(address, 0x0, 'has token contract address');
    return tokenSaleInstance.tokenPrice();
  }).then(function(price) {
    assert.equal(price, tokenPrice, 'token price is set correctly');
  });
  });
});
