var express = require('express');
var router = express.Router();
var userController = require('../controller/userController')
/* GET users listing. */
router.post('/login', function(req, res, next) {
  res.send(userController.login(req,res,next));
});

module.exports = router;
