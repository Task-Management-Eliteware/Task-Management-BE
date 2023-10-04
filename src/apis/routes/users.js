const express = require('express');
const { user } = require('../controllers');
const { verifyToken, signup, login, getUser } = require('../middleware');
const routes = express.Router();

routes.route('/signup').post([signup.validate()], user.signupUser);
routes.route('/login').post([login.validate()], user.loginUser);
routes.route('/user').get([verifyToken], user.getUser);

module.exports = routes;
