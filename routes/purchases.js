var express = require('express');
var router = express.Router();
const knex = require('../knex');

const checkAuth = require('../common/auth.js').checkAuth;

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

router.get('/', checkAuth, (req, res, next) => {
  let id = req.user.userId;
  knex('purchases')
    .where('user_id', id)
    .then((purchases) => {
      res.send(purchases);
    })
})

module.exports = router;
