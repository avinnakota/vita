var express = require('express');
var router = express.Router();
var utility = require('./subroutes/utility');
var auth = require('./subroutes/auth');
// Login users
router.post('/donor', function(req, res) {
});

router.post('/vendor', function(req, res) {

  utility.findAccountByEmail(req.body.email, 'vendor')
  .then(function(account) {
    if (account) {
      res.send(account);
    } else {
      res.send("Error!!");
    }
  });

});

router.post('/shelter', function(req, res) {
  
  utility.findAccountByEmail(req.body.email, 'shelter')
  .then(function(account) {
    if (account) {
      res.send(account);
    } else {
      res.send("Error!!");
    }
  });

});

router.post('/vendor/retrieve', function(req, res) {
  var request = req.body;
  var pin = Number(req.body.pin);

  // check vendor type

  utility.findRecipientByPin(pin, 'food').then(function(recipient) {
    // res.send(recipient);
    res.send(auth);
  });
  
});

router.post('/vendor/redeem', function(req, res) {
  var request = req.body;
  var pin = Number(req.body.pin);

  // Verify password and vendor type
  utility.findRecipientByPin(pin, 'food').then(function(recipient) {

  })

  //var recipient = utility.findRecipientByPin(results.pin).then(function(recipient){
    
    //check if password matches stored password
    // if (recipient.password === results.password) {

  // }));
      //perform action of deducting bill from balance amount and render new balance amount
      //return recipient and respond with balance type
      // utility.chargeRecipientByPin(results.pin, results.bill, results.type).then(function(results))
      //res.send(results)
      //}

    /*
    */
    //TODO: send back results.amount 
  //hardcoding response for testing purpose
  res.send(results);
});

module.exports = router;
