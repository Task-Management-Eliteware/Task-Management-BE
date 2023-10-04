const { TokenExpiredError, JsonWebTokenError } = require('jsonwebtoken');
const { Users } = require('../../../db');
const { verifyJwt, Api401Error, Api404Error } = require('../../../shared');

const verifyToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;

    if (!authorization || !authorization.startsWith('Bearer')) {
      throw new Api401Error('token not provided.');
    }

    const token = authorization.split(' ')[1];
    const decodeToken = await verifyJwt(token);
    const { userId } = decodeToken.user;

    const user = await Users.findOne({ _id: userId, isActive: true }).lean();
    if (!user) {
      throw new Api404Error('Invalid user.');
    }
    req.authorizedUser = { ...user };
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return next(new Api401Error('User session is expired.'));
    } else if (err instanceof JsonWebTokenError) {
      return next(new Api401Error('Unauthorized Action.'));
    }
    return next(err);
  }
};

module.exports = { verifyToken };
