var bookshelf = require('../config/bookshelf');

var Class = bookshelf.Model.extend({
  tableName: 'class'
});

module.exports = Class;