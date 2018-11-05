var SachToken = artifacts.require("./contracts/SachToken.sol");
var SachTokenSale = artifacts.require("./contracts/SachTokenSale.sol");

contract('SachTokenSale', function(accounts) {
  var tokenSaleInstance;
  var tokenInstance;
  var admin = accounts[0];
  var buyer = accounts[1];
  var tokenPrice = 1e15; // 1 quadrillion wei (0.001 ETH)
  var tokensAvailable = 0.75e6;
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
  return SachToken.deployed().then(function(instance) {
    //grab token instance first (why?)
    tokenInstance = instance;
  return SachTokenSale.deployed()
}).then(function(instance){
  //grab the token sale instance
    tokenSaleInstance = instance;
    //provision 75% of the tokens to the token sale
    return tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, {from: admin})
  }).then(function(receipt) {
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
    return tokenInstance.balanceOf(buyer);
  }).then(function(balance) {
    assert.equal(balance.toNumber(), numberOfTokens);
    return tokenInstance.balanceOf(tokenSaleInstance.address);
  }).then(function(balance) {
    assert.equal(balance.toNumber(), (tokensAvailable - numberOfTokens));
    //try to buy tokens different from the ETH value
    return tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: 1});
  }).then(assert.fail).catch(function(error){
    assert(error.message.indexOf('revert') >= 0, 'msg.value must equal number of tokens in wei');
    return tokenSaleInstance.buyTokens(0.8e6, {from: buyer, value: numberOfTokens*tokenPrice});
  }).then(assert.fail).catch(function(error){
    assert(error.message.indexOf('revert') >= 0, 'cannot purchase more tokens than available');;
    });
  });

  it('ends token sale', function() {
    return SachToken.deployed().then(function(instance) {
      tokenInstance = instance;
    return SachTokenSale.deployed()
  }).then(function(instance){
      tokenSaleInstance = instance;
      //try to end sale other than the admin
      return tokenSaleInstance.endSale({from: buyer}); // this test was supposed to fail and didnt
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert' >= 0, 'must be admin to end sale'));
    //   //try to end the sale using the admin account
      return tokenSaleInstance.endSale({ from: admin });
    }).then(function(receipt) {
    //   return tokenInstance.balanceOf(admin);
    // }).then(function(balance) {
    //   assert.equal(balance.toNumber(), 999990, 'returns all unsold SachTokens');

    // check that the state variable has been cleared as a result of the self-destruct method

    // Check that the contract has no balance
    balance = web3.eth.getBalance(tokenSaleInstance.address)
    assert.equal(balance.toNumber(), 0);
  //   
  //   return tokenSaleInstance.tokenPrice();
  // }).then(function(price){
  //   assert.equal(price.toNumber(), 0, 'token price was reset');
    });
  });
});
