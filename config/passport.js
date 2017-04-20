var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/Users');

passport.use(new LocalStrategy(
  function (email, password, done) {
    new User({
      email: email
    })
    .fetch({ require: true }) //will throw error if there is no record
    .then(function (member) {
      return member.validatePassword(password) //will throw if it's not a valid password
      .then(function () {
        done(null, member);
      });
    })
    .catch(function (err) {
      // we'll either get a 'record not found' from bookshelf or a 'invalid password' from .validatePassword()
      // but we don't want to expose all that, so we'll return a "invalid email OR password error
      console.log(err.stack);
      done(null, false, 'Invalid email and/or password');
    });
  }
))