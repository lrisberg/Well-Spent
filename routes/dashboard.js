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
      let averageHappinessOverTime = [];

      const needyPromises = purchases.map((purchase) => {
        return knex('happiness')
          .where('purchase_id', purchase.id)
          .orderBy('created_at', 'desc')
          .then((happinesses) => {
            if (isHappinessPromptRequired(happinesses)) {
              needyPurchases.push(purchase);
            }
          });
      });

      const averageHappinessPromises = purchases.map((purchase) => {
        return knex('happiness')
          .where('purchase_id', purchase.id)
          .then((happinesses) => {
            let purchasePlusHappiness = {
              happiness: happinesses
            };
            Object.assign(purchasePlusHappiness, purchase);
            averageHappinessOverTime.push(purchasePlusHappiness);
          })
      })



      Promise.all(needyPromises).then(() => {
        Promise.all(averageHappinessPromises).then(() => {
          res.send({
            numberOfNeedyPurchases: needyPurchases.length,
            averageHappinessOverTime: averageHappinessOverTime
          })
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
