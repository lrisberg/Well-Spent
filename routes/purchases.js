var express = require('express');
var router = express.Router();
const knex = require('../knex');
var moment = require('moment');

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
  let userId = req.user.userId;
  knex('purchases')
    .where('user_id', userId)
    .then((purchases) => {
      res.send(purchases);
    })
})

function isHappinessPromptRequired(happinesses) {
  const interval = 24;
  if (happinesses.length === 0) {
    return true;
  }
  let difference = moment().diff(moment(happinesses[0].created_at), 'hours');
  return difference >= interval;
}

router.get('/:id', checkAuth, (req, res, next) => {
  let userId = req.user.userId;
  knex('purchases')
    .where('user_id', userId)
    .where('id', req.params.id)
    .then((purchases) => {
      knex('happiness')
        .where('purchase_id', req.params.id)
        .orderBy('created_at', 'desc')
        .then((happiness) => {
          let purchasePlusHappiness = {
            happiness: happiness
          };
          Object.assign(purchasePlusHappiness, purchases[0]);
          purchasePlusHappiness.promptForHappiness = isHappinessPromptRequired(happiness);
          res.send(purchasePlusHappiness);
        })
    })
})

module.exports = router;
