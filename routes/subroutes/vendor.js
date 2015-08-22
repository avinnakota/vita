var express = require('express');
var router = express.Router();

// TODO: utility functions

/* GET donors listing. */
router.get('/', function(req, res, next) {
  res.send("Return all vendors listing");
});

router.get('/:id', function(req, res, next) {
  // validation
  res.send(req.params.id);
});

router.put('/:id', function(req, res, next) {
  res.send("Update vendor!");
});

router.delete('/:id', function(req, res, next) {

});

module.exports = router;