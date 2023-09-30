const { UserTasks } = require('../../../db');
const { catchResponse } = require('../../res-handler');

const listTask = async (req) => {
  const { _id: userId } = req.authorizedUser;
  const task = await UserTasks.aggregate([
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
  const result = await listTask(req);
  return { result, statusCode: 200 };
});

module.exports = { listTask: controller };
