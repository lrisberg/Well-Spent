'use strict';

const environment = process.env.NODE_ENV || 'test';
const knexConfig = require('./knexfile')[environment];
const knex = require('knex')(knexConfig);

module.exports = knex;

'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/well-spent'
  }
}