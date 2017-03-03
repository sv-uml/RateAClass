var express = require("express");
var router = express.Router();

router.get('/internal/:name', function(req, res, next) {
	res.render("internal/" + req.params.name, { title: "Express" });
});

module.exports = router;