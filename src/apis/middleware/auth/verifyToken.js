const { verifyJwt, Api401Error } = require('../../../shared');

const verifyToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;

    if (!authorization || !authorization.startsWith('Bearer')) {
      throw new Api401Error('token not provided.');
    }

    const token = authorization.split(' ')[1];
    const decodeUser = await verifyJwt(token);

    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = { verifyToken };
