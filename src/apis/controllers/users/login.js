const { Api404Error, Api400Error, compareHash } = require('../../../shared');
const { catchResponse } = require('../../res-handler');
const { getUserByEmail } = require('./getUser');

const login = async (req) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user) throw new Api404Error('User not exits.');

  const isValidPassword = compareHash(password, user.password);
  if (!isValidPassword) throw new Api400Error('Invalid password.');

  return user;
};

const controller = catchResponse(async (req, res) => {
  const result = await login(req);
  return { result, statusCode: 201 };
});

module.exports = { loginUser: controller };
