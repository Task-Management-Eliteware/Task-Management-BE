const {
  Api404Error,
  Api400Error,
  compareHash,
  signJwt
} = require('../../../shared');
const { catchResponse } = require('../../res-handler');
const { getUserByEmail } = require('./getUser');

const login = async (req) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user) throw new Api400Error('Invalid email or password');

  const isValidPassword = compareHash(password, user.password);
  if (!isValidPassword) throw new Api400Error('Invalid email or password');
  delete user.password;

  const token = signJwt(user);
  return { token };
};

const controller = catchResponse(async (req, res) => {
  const result = await login(req);
  return { result, statusCode: 200 };
});

module.exports = { loginUser: controller };
