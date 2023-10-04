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

const getUse = async (req) => {
  const { _id: userId } = req.authorizedUser;
  const user = await Users.findOne({ _id: userId, isActive: true }).lean();
  if (!user) return user;
  return formatUser(user);
};

const controller = catchResponse(async (req, res) => {
  const result = await getUse(req);
  return { result, statusCode: 201 };
});

module.exports = { getUser: controller, getUserByEmail, formatUser };
