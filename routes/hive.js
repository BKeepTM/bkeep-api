var express = require('express');
var router = express.Router();
var hiveController = require("../controller/hiveController.js")

/* GET hive. */
router.get('/hive', hiveController.getHive);

module.exports = router;