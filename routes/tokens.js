var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt-as-promised');
const knex = require('../knex');

router.post('/', function(req, res, next) {
  let password = req.body.password;
  let email = req.body.email;

  knex('users')
    .select(['id', 'email', 'hashed_password'])
    .where('email', email)
    .then((users) => {
      if (users.length === 0) {
        res.setHeader("Content-Type", "plain/text");
        res.status(400);
        res.send('Bad email or password');
        return;
      }
      bcrypt.compare(password, users[0].hashed_password)
      .then(() => {
        res.send('ok!')
        //return token
      }, () => {
        res.setHeader('Content-Type', 'plain/text');
        res.status(400);
        res.send('Bad email or password');
      })
    })
});

module.exports = router;
