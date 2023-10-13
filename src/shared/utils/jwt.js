const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const secretKey = process.env.JWT_SECRET_KEY;
const expiredIn = process.env.JWT_EXPIRED_IN;

const signJwt = (payload) => {
  const signedPayload = jwt.sign({ user: payload }, secretKey, {
    expiresIn: expiredIn
  });

  return signedPayload;
};

const verifyJwt = async (signedPayload) => {
  const decodedPayload = await promisify(jwt.verify)(signedPayload, secretKey);
  return decodedPayload;
};

module.exports = { signJwt, verifyJwt };
