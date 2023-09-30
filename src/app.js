const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { appRoutes } = require('./apis');
const { appError } = require('./shared');

const app = express();
const BASE_API_PATH = process.env.BASE_API_PATH;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(BASE_API_PATH, appRoutes);
app.use(appError);
module.exports = app;
