'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    name: Joi.string()
      .required()
      .label('Name')
      .trim(),

    price: Joi.number()
      .label('Price'),

    date: Joi.string()
      .label('Date')
      .trim(),

    category_id: Joi.number()
      .integer()
      .label('Category')
  }
}
