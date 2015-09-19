var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send("Express Route from server")
});

module.exports = router;