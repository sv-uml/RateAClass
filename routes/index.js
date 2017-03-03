var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.render('index', { title: 'Rate a Class' });
=======
  res.render('index', { title: 'Express' });
>>>>>>> 25d2d21a65e9a63d1fda8adcc06704a26c965dd9
});

module.exports = router;
