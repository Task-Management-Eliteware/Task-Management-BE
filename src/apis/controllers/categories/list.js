const { UserTaskCategories } = require('../../../db');
const { catchResponse } = require('../../res-handler');

const listCategory = async (req) => {
  const { _id: userId } = req.authorizedUser;
  const task = await UserTaskCategories.aggregate([
    {
      $match: {
        userId: userId,
        isActive: true,
      },
    },
  ]);

  return { data: task };
};

const controller = catchResponse(async (req, res) => {
  const result = await listCategory(req);
  return { result, statusCode: 200 };
});

module.exports = { listCategory: controller };
