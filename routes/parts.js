var express = require('express');
var router = express.Router();

var db = require('../database/db');

/* GET parts page. */
router.get('/', function(req, res, next) {
    db.any('SELECT * FROM public."Parts_925"', [true])
        .then(function(data) {
            console.log(data); // print data;
        })
        .catch(function(error) {
            console.log(error); // print error;
        });
  res.render('index', { title: 'Express' });
});

module.exports = router;
