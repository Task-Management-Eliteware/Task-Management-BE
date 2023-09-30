const { Users } = require('../../../db');
const { catchResponse } = require('../../res-handler');

const formatUser = (user) => {
  user.userId = user._id;
  delete user._id;
  delete user.__v;
  return user;
};

const getUserByEmail = async (email) => {
  const user = await Users.findOne({ email }).select('+password').lean();
  if (!user) return user;
  return formatUser(user);
};

const controller = catchResponse(async (req, res) => {
  const result = await getUserByEmail(req.email);
  return { result, statusCode: 201 };
});

module.exports = { signupUser: controller, getUserByEmail, formatUser };
