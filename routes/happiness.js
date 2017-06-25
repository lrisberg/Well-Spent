var express = require('express');
var router = express.Router();
const knex = require('../knex');

const checkAuth = require('../common/auth.js').checkAuth;

router.post('/:purchaseId/happiness/', checkAuth, (req, res, next) => {

  knex('happiness')
    .returning(['id', 'purchase_id', 'happiness'])
    .insert({
      purchase_id: req.params.purchaseId,
      happiness: req.body.happiness
    })
    .then((happiness) => {
      res.send(happiness[0])
    });
});

module.exports = router;
