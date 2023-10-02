const { UserTasks } = require('../../../db');
const { collections, toObjectId } = require('../../../shared');
const { catchResponse } = require('../../res-handler');

const listTask = async (req) => {
  const { taskCategoryIds: catIds } = req.query;
  const { _id: userId } = req.authorizedUser;
  let taskCategoryIds = [];
  if (catIds) {
    taskCategoryIds = JSON.parse(catIds).map((id) => toObjectId(id));
  }

  const task = await UserTasks.aggregate([
    {
      $match: {
        userId: userId,
        isActive: true,
      },
    },
    {
      $lookup: {
        from: collections.UserTaskCategories,
        foreignField: '_id',
        localField: 'taskCategoryId',
        as: 'tasksCategory',
      },
    },
    {
      $unwind: '$tasksCategory',
    },
    {
      $match: {
        $or: [
          { 'tasksCategory._id': { $in: taskCategoryIds } }, // if taskCategoryIds is not empty
          {
            $expr: {
              $eq: [taskCategoryIds, []], // if taskCategoryIds is empty
            },
          },
        ],
      },
    },
    {
      $sort: {
        updatedAt: -1,
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
