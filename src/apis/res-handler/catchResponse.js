const { Api400Error } = require('../../shared');
const { responseGenerator } = require('./res-generator');

const catchResponse = (controllerFn) => {
  return async (req, res, next) => {
    try {
      const ctrResponse = await controllerFn(req, res, next);
      const { statusCode, message, result } = responseGenerator({
        httpMethod: req.method,
        api: req.originalUrl,
        ...ctrResponse
      });
      res.status(statusCode).json({
        message,
        result
      });
    } catch (err) {
      return next(err);
    }
  };
};

module.exports = { catchResponse };
