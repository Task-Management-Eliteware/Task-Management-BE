const { Api400Error } = require('../../../shared');

const validator = function () {
  return async (req, res, next) => {
    try {
      await this.schema.validateAsync(
        { ...req.body, ...req.params, ...req.query },
        { allowUnknown: true }
      );
      next();
    } catch (err) {
      return next(new Api400Error(err.message));
    }
  };
};

module.exports = { validator };
