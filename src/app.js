const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
var morgan = require('morgan');
const { appRoutes } = require('./apis');
const { appError, Api404Error } = require('./shared');

const app = express();
const BASE_API_PATH = process.env.BASE_API_PATH;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(BASE_API_PATH, appRoutes);

app.all('*', (req, res, next) => {
  next(new Api404Error(`Api ${req.originalUrl} not found.`));
});

app.use(appError);
module.exports = app;
