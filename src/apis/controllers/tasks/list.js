const { UserTasks } = require('../../../db');
const { collections, toObjectId, stringToArray } = require('../../../shared');
const { catchResponse } = require('../../res-handler');

const listTask = async (req) => {
  const { taskCategoryIds: catIds, pageNumber = 1, limit = 10, sortByField = 'createdAt', sortOrder = 1 } = req.query;

  const { _id: userId } = req.authorizedUser;

  let taskCategoryIds = [];
  if (catIds) {
    taskCategoryIds = stringToArray(catIds).map((id) => toObjectId(id));
  }

  const tasks = await UserTasks.aggregate([
    {
      $match: {
        userId: userId,
        isActive: true,
      },
    },
    {
      $sort: {
        [sortByField]: +sortOrder,
      },
    },
    {
      $skip: (+pageNumber - 1) * limit,
    },
    {
      $limit: +limit,
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
  ]);

  return { data: tasks };
};

const controller = catchResponse(async (req, res) => {
  const result = await listTask(req);
  return { result, statusCode: 200 };
});

module.exports = { listTask: controller };
