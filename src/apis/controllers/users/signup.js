const { Users, defaultCategories, UserTaskCategories } = require('../../../db');
const { Api400Error, crateHash } = require('../../../shared');
const { catchResponse } = require('../../res-handler');
const { getUserByEmail, formatUser } = require('./getUser');

const createDefaultTaskCategories = async (user) => {
  const { userId } = user;
  const defCategories = defaultCategories.categories.map(({ categoryType }) => ({ categoryType, userId }));
  const categories = await UserTaskCategories.insertMany(defCategories);
};

const signupUser = async (req) => {
  const { firstName, lastName, email, password } = req.body;
  const hasPassword = crateHash(password);
  const user = await Users.create({ firstName, lastName, email, password: hasPassword });
  const formattedUser = formatUser(user.toObject());
  await createDefaultTaskCategories(formattedUser);
  return formattedUser;
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
