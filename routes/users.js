var express = require('express');
var router = express.Router();

//validations
const ev = require('express-validation');
const validations = require('../validations/users');

const bcrypt = require('bcrypt-as-promised');
const knex = require('../knex');

router.post('/', ev(validations.post), function(req, res, next) {
  bcrypt.hash(req.body.password, 12)
    .then((hashed_password) => {
      return knex('users')
        .insert({
          email: req.body.email,
          hashed_password: hashed_password
        }, '*');
    })
    .then((users) => {
      const user = users[0];
      delete user.hashed_password;
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
