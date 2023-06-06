var express = require('express');
var router = express.Router();

var db = require('../database/db');

/* GET parts page. */
router.get('/', function(req, res, next) {
    db.any('SELECT * FROM public."Parts925"', [true])
        .then(function(data) {
            res.json(data);
        })
        .catch(function(error) {
            res.json(error);
        });
});

module.exports = router;
