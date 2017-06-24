'use strict';

module.exports = {
  "development": {
    "client": 'pg',
    "connection": 'postgres://localhost/well_spent_dev'
  },
  "test": 'postgres://localhost/well_spent_test',

  "production": {
    "client": 'pg',
    "connection": process.env.DATABASE_URL
  }
};
