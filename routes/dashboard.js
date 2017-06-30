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
      let averageHappinessPerPurchase;

      const knexPromises = purchases.map((purchase) => {
        return knex('happiness')
          .where('purchase_id', purchase.id)
          .orderBy('created_at', 'desc')
          .then((happinesses) => {
            if (isHappinessPromptRequired(happinesses)) {
              needyPurchases.push(purchase);
            }
          });
      });

      let avgPromise = knex.raw("select purchases.name, AVG(happiness) AS happiness from purchases LEFT JOIN happiness ON happiness.purchase_id = purchases.id where user_id=1 GROUP BY purchases.id;").then((response) => {
        averageHappinessPerPurchase = response.rows.map((row) => {
          return {
            name: row.name,
            happiness: parseFloat(row.happiness)
          }
        })
      })
      knexPromises.push(avgPromise);

      Promise.all(knexPromises).then(() => {
        res.send({
          numberOfNeedyPurchases: needyPurchases.length,
          avgHappinesPerPurchase: averageHappinessPerPurchase
        });
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
