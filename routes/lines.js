var express = require('express');
var router = express.Router();

var db = require('../database/db');

/* GET all lines */
router.get('/', function(req, res, next) {
    db.any(`
            SELECT * 
            FROM public.lines925
        `, [true])
        .then(function(data) {
            res.json(data);
        })
        .catch(function(error) {
            res.json(error);
        });
});

module.exports = router;
