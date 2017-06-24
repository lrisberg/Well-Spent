var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt-as-promised');
const knex = require('../knex');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_KEY || 'its a secret SHHHHHH!';

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
        const token = jwt.sign({
          userId: users[0].id
        }, SECRET);
        res.setHeader('Content-Type', 'application/json')
        res.send(token);
      }, () => {
        res.setHeader('Content-Type', 'plain/text');
        res.status(400);
        res.send('Bad email or password');
      })
    })
});

module.exports = router;
