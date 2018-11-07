App = {
  web3Provider : null,
  contracts: {},
  account: '0x0',
  loading: false,
  tokenPrice: 1e15,
  tokensSold: 0,
  tokensAvailable: 0.75e6,

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
        // console.log("Sach Token Sale Address:",sachTokenSale.address);
      });
  }).done(function(){
        $.getJSON("SachToken.json", function(sachToken){
          App.contracts.SachToken = TruffleContract(sachToken);
          App.contracts.SachToken.setProvider(App.web3Provider);
          App.contracts.SachToken.deployed().then(function(sachToken){
            // console.log("Sach Token Address:",sachToken.address);
          });
          return App.render();
        });
      })
  },
     render: function(){
       if(App.loading){
         return;
       }
       App.loading = true; // if any of the below code is happening set the laoding value to true

       var loader = $('#loader');
       var content = $('#content');

       loader.show();
       content.hide();

       // load account data
       web3.eth.getCoinbase(function(err,account){
         if(err == null){
           App.account = account;
           $('#accountAddress').html("Your Account:" + account);
         }
       })

       App.contracts.SachTokenSale.deployed().then(function(instance){
         tokenSaleInstance = instance;
         return tokenSaleInstance.tokenPrice();
       }).then(function(tokenPrice){
         App.tokenPrice = tokenPrice;
        //  console.log("tokenPrice:",web3.fromWei(App.tokenPrice, 'ether').toNumber(), 'ETH');
         $('.token-price').html(web3.fromWei(App.tokenPrice, 'ether').toNumber());
         return tokenSaleInstance.tokensSold();
       }).then(function(tokensSold){
         App.tokensSold = 600000;
        //  App.tokensSold = tokensSold;
         $('.tokens-sold').html(App.tokensSold);
        //  $('.tokens-sold').html(App.tokensSold.toNumber());

        //  console.log("tokensAvailable:",App.tokensAvailable);
         $('.tokens-available').html(App.tokensAvailable);
        //  $('.tokens-available').html(App.tokensAvailable.toNumber());

        var progressPercent = (Math.ceil(App.tokensSold *100 / App.tokensAvailable));
        console.log(progressPercent,'%');
        $('#progress').css('width', progressPercent+'%');
       });


         App.loading = false;
         loader.hide();
         content.show();
     }
   }

$(function(){
  $(window).load(function() {
    App.init();
  })
})
