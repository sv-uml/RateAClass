var bookshelf = require('../config/bookshelf');

var School = bookshelf.Model.extend({
  tableName: 'school'
});

module.exports = School;