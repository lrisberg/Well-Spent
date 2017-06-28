'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    email: Joi.string()
      .label('Email')
      .trim()
      .required(),

    password: Joi.string()
      .min(8)
      .required()
      .label('Password')
  }
}
