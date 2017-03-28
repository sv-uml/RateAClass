var express = require('express');
var models  = require('../models');
var router = express.Router();

router.get('/search/school/:name', function(req, res, next) {
    var school = req.params.name;
    models.School.findAll({ where: { name: { $like: '%' + school + '%' } }, limit: 10 }).then(function(schools) {
        res.json(schools);
    });
});

router.get('/search/:school/:class', function(req, res, next) {
	var school = req.params.school;
	var classes = req.params.class;
	var query = { where: { school: school}, limit: 10 };
	if (classes != "all")
		query = { where: { school: school, name: { $like: '%' + classes + '%' } }, limit: 10 };

	models.Class.findAll(query).then(function(classes) {
		res.json(classes);
	});
});

router.get('/school/:unique', function(req, res, next) {
	var unique = req.params.unique;
	models.School.find({ where: { unique: unique } }).then(function(schools) {
        res.json(schools);
    });
});

module.exports = router;
