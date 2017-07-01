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

      let avgHappinessPerPurchasePromise = knex.raw("select purchases.name, AVG(happiness) AS happiness from purchases LEFT JOIN happiness ON happiness.purchase_id = purchases.id where user_id=1 GROUP BY purchases.id ORDER BY happiness ASC;").then((response) => {
        averageHappinessPerPurchase = response.rows.map((row) => {
          return {
            name: row.name,
            happiness: parseFloat(row.happiness)
          };
        });

        averageHappinessPerPurchase.sort((a, b) => {
          if (a.happiness === null) {
            return 1;
          }
          if (b.happiness === null) {
            return -1;
          }
          return b.happiness - a.happiness;
        })
      })
      knexPromises.push(avgHappinessPerPurchasePromise);

      let avgHappinessOverTimePromise = knex.raw("select date_trunc('day', happiness.created_at) as day, AVG(happiness) as happiness from happiness INNER JOIN purchases ON (purchases.id = happiness.purchase_id) where purchases.user_id = ? group by day order by day;", req.user.userId).then((response) => {
        averageHappinessOverTime = response.rows.map((row) => {
          return {
            date: row.day,
            happiness: parseFloat(row.happiness)
          };
        });
      })
      knexPromises.push(avgHappinessOverTimePromise);

      Promise.all(knexPromises).then(() => {
        res.send({
          numberOfNeedyPurchases: needyPurchases.length,
          avgHappinessPerPurchase: averageHappinessPerPurchase,
          avgHappinessOverTime: averageHappinessOverTime
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
