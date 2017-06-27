var express = require('express');
var router = express.Router();
const knex = require('../knex');
var moment = require('moment');

const responses = require('../common/responses.js');

const checkAuth = require('../common/auth.js').checkAuth;

router.get('/', checkAuth, (req, res, next) => {
  knex('purchases')
    .where('user_id', req.user.userId)
    .then((purchases) => {
      let needyPurchases = [];

      const promises = purchases.map((purchase) => {
        return knex('happiness')
          .where('purchase_id', purchase.id)
          .orderBy('created_at', 'desc')
          .then((happinesses) => {
            if (isHappinessPromptRequired(happinesses)) {
              needyPurchases.push(purchase);
            }
          });
      });

      Promise.all(promises).then(() => {
        res.send({
          numberOfNeedyPurchases: needyPurchases.length
        })
      })
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

module.exports = router;
