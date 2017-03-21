var express = require('express');
var models  = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Rate a Class' });
});

router.get('/search/school/:name', function(req, res, next) {
    var school = req.params.name;
    models.School.findAll({ where: { name: { $like: '%' + school + '%' } } }).then(function(schools) {
        res.json(schools);
    });
});

module.exports = router;
