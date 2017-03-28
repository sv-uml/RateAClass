var express = require("express");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Rate a Class' });
});

router.get('/internal/:name', function(req, res, next) {
	res.render("internal/" + req.params.name, { title: "Express" });
});

module.exports = router;