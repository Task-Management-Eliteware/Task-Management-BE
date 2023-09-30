const Joi = require('joi');
const { validator } = require('./validator');
const { REGEX } = require('../../../shared');

const stringInValidMsg = { 'string.pattern.base': `please enter valid {{#label}}.` };

const fields = {
  name: Joi.string().min(1).max(30).regex(REGEX.NAME).messages(stringInValidMsg),
  email: Joi.string().regex(REGEX.EMAIL).required().messages(stringInValidMsg),
  password: Joi.string().min(4).required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({ 'any.only': 'confirm password is not matching' }),
  mongoId: Joi.string().regex(REGEX.MONOGID),
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

const createTask = {
  validate: validator,
  schema: Joi.object().keys({
    taskTitle: Joi.string().required(),
    taskDescription: Joi.string(),
    taskCategory: Joi.string(),
    taskPriorities: Joi.string(),
  }),
};

const updateTask = {
  validate: validator,
  schema: createTask.schema.append({
    taskId: fields.mongoId.required(),
  }),
};

const deleteTask = {
  validate: validator,
  schema: Joi.object().keys({
    taskId: fields.mongoId.required(),
  }),
};

module.exports = { signup, login, createTask, updateTask, deleteTask };
