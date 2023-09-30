const Joi = require('joi');
const { validator } = require('./validator');
const { REGEX } = require('../../../shared');

const stringInValidMsg = { 'string.pattern.base': `please enter valid {{#label}}.` };

const fields = {
  name: Joi.string().min(1).max(30).regex(REGEX.NAME).messages(stringInValidMsg),
  email: Joi.string().regex(REGEX.EMAIL).required().messages(stringInValidMsg),
  password: Joi.string().min(4).required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({ 'any.only': 'confirm password is not matching' }),
};

const signup = {
  validate: validator,
  schema: Joi.object().keys({
    firstName: fields.name.required(),
    lastName: fields.name.required(),
    email: fields.email.required(),
    password: fields.password,
    confirmPassword: fields.confirmPassword,
  }),
};

const login = {
  validate: validator,
  schema: Joi.object().keys({
    email: fields.email.required(),
    password: fields.password,
  }),
};

module.exports = { signup, login };
