var express = require('express');
var router = express.Router();
const knex = require('../knex');

const checkAuth = require('../common/auth.js').checkAuth;
const responses = require('../common/responses.js');

router.post('/:purchaseId/happiness/', checkAuth, (req, res, next) => {
  let userId = req.user.userId;
  knex ('purchases')
    .where('id', req.params.purchaseId)
    .then((purchases) => {
      if (purchases.length === 0) {
        responses.notFound(res);
        return;
      }
      if (purchases[0].user_id !== userId) {
        responses.unauthorized(res);
        return;
      }
      knex('happiness')
        .returning(['id', 'purchase_id', 'happiness'])
        .insert({
          purchase_id: req.params.purchaseId,
          happiness: req.body.happiness
        })
        .then((happiness) => {
          res.send(happiness[0])
        });
    })
});

module.exports = router;
