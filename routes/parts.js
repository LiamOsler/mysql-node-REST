var express = require('express');
var router = express.Router();

var db = require('../database/db');

/* GET all parts */
router.get('/', function(req, res, next) {
    db.any(`SELECT * FROM public.parts925`, [true])
        .then(function(data) {
            res.json(data);
        })
        .catch(function(error) {
            res.send(error);
        });
});

/* GET parts by part number */
router.get('/number/:number', function(req, res, next) {
    var partNumber = req.params.number;

    db.any(`SELECT part_name, part_number, part_number_cpu, part_description FROM public.parts925 WHERE "part_number" = $1 `, [partNumber])
        .then(function(data) {
            res.json(data);
        })
        .catch(function(error) {
            res.status(500);
            res.send(error);
        });
});

module.exports = router;
