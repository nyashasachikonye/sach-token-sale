var SachTokenSale = artifacts.require("./contracts/SachTokenSale.sol");

contract('SachTokenSale', function(accounts) {
  var tokenSaleInstance;
  var buyer = accounts[1];
  var tokenPrice = 1e15; // 1 quadrillion wei (0.001 ETH)
  var numberOfTokens;

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

it('facilitates the purchasing of tokens', function() {
  return SachTokenSale.deployed().then(function(instance) {
    tokenSaleInstance = instance;
    numberOfTokens = 10;
    return tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: numberOfTokens*tokenPrice})
  }).then(function(receipt) {
    assert.equal(receipt.logs.length, 1, 'triggers one event');
    assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
    assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchased the tokens');
    assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of tokens that we purchased');
    return tokenSaleInstance.tokensSold();
  }).then(function(amount) {
    assert.equal(amount.toNumber(), numberOfTokens, 'increments the number of tokens sold');
    //try to buy tokens different from the ETH value
    return tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: 1});
  }).then(assert.fail).catch(function(error){
    assert(error.message.indexOf('revert') >= 0, 'msg.value must equal number of tokens in wei');
    });
  });
});
