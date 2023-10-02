const express = require('express');
const users = require('./users');
const tasks = require('./tasks');
const categories = require('./categories');

const route = express();

route.use(users);
route.use(tasks);
route.use(categories);

module.exports = route;
