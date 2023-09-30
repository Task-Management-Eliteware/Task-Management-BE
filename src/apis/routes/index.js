const express = require('express');
const users = require('./users');
const tasks = require('./tasks');
const route = express();

route.use(users);
route.use(tasks);

module.exports = route;
