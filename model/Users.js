var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var bookshelf = require('../config/bookshelf');

var User = bookshelf.Model.extend({
  tableName: 'users',
  validatePassword: function (password) {
    var encryptedPass = this.get('password');
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, encryptedPass, function (err, match) {
        if (err) return reject(err);

        if (match) {
            resolve();
        }
        else {
            reject(new Error('invalid password'));
        }
      });
    });
  },
  generateJWT: function(user) {
    // set expiration to 60 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      _id: user.id,
      name: user.attributes.name,
      exp: parseInt(exp.getTime() / 1000),
    }, '0010');
  }
}, {
  createPassword: function (password) {
    return new Promise(function (resolve, reject) {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) return reject(err);
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) return reject(err);
          resolve(hash);
        });
      });
    });
  }
});

module.exports = User;