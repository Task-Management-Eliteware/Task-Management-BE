// const express = require('express');
// const users = require('./users');
// const categories = require('./categories');

import express, { Request, Response } from 'express';
import tasks from './tasks';

const routes = express.Router();

const route = express();

// route.use(users);
route.use(tasks);
// route.use(categories);

export default route;
