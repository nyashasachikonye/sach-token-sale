var SachToken = artifacts.require("../contracts/SachToken.sol");

contract('SachToken', function(accounts) {
  it('sets the total supply upon deployment', function(){
    return SachToken.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.totalSupply();
    }).then(function(totalSupply) {
      assert.equal(totalSupply.toNumber(), 1000000)
    });

  });
})
