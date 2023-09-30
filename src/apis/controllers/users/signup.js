const { Users } = require('../../../db');
const { Api400Error, crateHash } = require('../../../shared');
const { catchResponse } = require('../../res-handler');
const { getUserByEmail, formatUser } = require('./getUser');

const signupUser = async (req) => {
  const { firstName, lastName, email, password } = req.body;
  const hasPassword = crateHash(password);
  const user = await Users.create({ firstName, lastName, email, password: hasPassword });
  return formatUser(user.toObject());
};

const controller = catchResponse(async (req, res) => {
  const isUserExists = await getUserByEmail(req.email);

  if (isUserExists) {
    throw new Api400Error('Email is Already exits.');
  }
  const result = await signupUser(req);
  return { result, statusCode: 201 };
});

module.exports = { signupUser: controller };
