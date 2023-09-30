const { Api400Error } = require('../../shared');

const catchResponse = (controllerFn) => {
  return async (req, res, next) => {
    try {
      const result = await controllerFn(req, res, next);
      res.status(result.statusCode).json({
        message: result.message,
        result: result.result,
      });
    } catch (err) {
      return next(err);
    }
  };
};

module.exports = { catchResponse };
