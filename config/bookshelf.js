var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'johnny.heliohost.org',
    user     : 'ratecls_user',
    password : 'qwerty123',
    database : 'ratecls_rateclass',
    charset  : 'utf8'
  }
});
module.exports = require('bookshelf')(knex);