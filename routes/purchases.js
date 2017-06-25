var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const knex = require('../knex');

const SECRET = process.env.JWT_KEY || 'its a secret SHHHHHH!';

function checkAuth(req, res, next) {
  let token = req.body.token;
  if (token) {
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        res.setHeader("Content-Type", "text/plain");
        res.status(401);
        res.send('Unauthorized');
      }
      else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.setHeader("Content-Type", "text/plain");
    res.status(401);
    res.send('Unauthorized');
  }
}

router.post('/', checkAuth, (req, res, next) => {
  let body = req.body;
  knex('purchases')
    .returning(['id', 'user_id', 'name', 'price', 'date'])
    .insert({
      user_id: req.user.userId,
      name: req.body.name,
      price: req.body.price,
      date: req.body.date
    })
    .then((purchases) => {
      res.send(purchases[0])
    })
});

module.exports = router;
