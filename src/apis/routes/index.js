const express = require('express');
const users = require('./users');
const route = express();

route.use(users);
module.exports = route;
