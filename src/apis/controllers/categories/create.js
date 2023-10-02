const { UserTaskCategories } = require('../../../db');
const { catchResponse } = require('../../res-handler');

const createCategory = async (req) => {
  const { categoryType } = req.body;
  const { _id: userId } = req.authorizedUser;
  const category = await UserTaskCategories.create({ categoryType, userId });
  return category;
};

const controller = catchResponse(async (req, res) => {
  const result = await createCategory(req);
  return { result, statusCode: 201 };
});

module.exports = { createCategory: controller };
