var bookshelf = require('../config/bookshelf');

var Review = bookshelf.Model.extend({
  tableName: 'reviews'
});

module.exports = Review;