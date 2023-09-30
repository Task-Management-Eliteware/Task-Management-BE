const express = require('express');
const { user } = require('../controllers');
const { verifyToken, signup, login } = require('../middleware');
const routes = express.Router();

routes.route('/signup').post([signup.validate()], user.signupUser);
routes.route('/login').post([login.validate()], user.loginUser);

module.exports = routes;
