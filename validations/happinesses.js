'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    happiness: Joi.number()
      .integer()
      .min(1)
      .max(7)
      .label('Happiness')
      .required()
  }
};
