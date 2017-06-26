var express = require('express');
var router = express.Router();
const knex = require('../knex');

const responses = require('../common/responses.js');

const checkAuth = require('../common/auth.js').checkAuth;

router.get('/', (req, res, next) => {
  knex('categories')
    .then((categories) => {
      res.send(categories);
    })
})

module.exports = router;
