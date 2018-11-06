App = {
  web3Provider : null,
  contracts: {},

  init : function(){
    console.log("app initialized...");
    return App.initWeb3();
  },
  initWeb3: function(){
  if(typeof web3 !== 'undefined'){
    // if a web3 instance is already provided by Meta Mask
  App.web3Provider = web3.currentProvider; // ?? on this whole section
  web3 = new Web3(web3.currentProvider);
} else {
  // specify the default instance if no web3 instance provided
  App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
  web3 = new Web3(App.web3Provider);
    }
    return App.initContracts();
  },

  initContracts: function(){
    $.getJSON("SachTokenSale.json", function(sachTokenSale){
      App.contracts.SachTokenSale = TruffleContract(sachTokenSale);
      App.contracts.SachTokenSale.setProvider(App.web3Provider);
      App.contracts.SachTokenSale.deployed().then(function(sachTokenSale){
        console.log("Sach Token Sale Address:",sachTokenSale.address);
      })
    })
  }
}

$(function(){
  $(window).load(function() {
    App.init();
  })
})
