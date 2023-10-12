const { UserTasks } = require('../../../db');
const { collections, toObjectId, stringToArray } = require('../../../shared');
const { catchResponse } = require('../../res-handler');

const aggregateWithPagination = async (model, aggregationQuery, pageNumber = 1, limit = 10) => {
  const pipeline = [...aggregationQuery];
  const paginationQuery = {
    $facet: {
      data: [{ $skip: (+pageNumber - 1) * +limit }, { $limit: +limit }],
      total: [
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            total: 1,
          },
        },
      ],
    },
  };

  pipeline.push(paginationQuery);
  const [list] = await model.aggregate(pipeline);

  return {
    data: list.data,
    pagination: {
      page: +pageNumber,
      pageSize: list?.data.length || 0,
      totalRecords: list?.total[0]?.total || 0,
    },
  };
};

const listTask = async (req) => {
  const { taskCategories, pageNumber = 1, limit = 10, sortByField = 'createdAt', sortOrder = -1 } = req.query;

  const { _id: userId } = req.authorizedUser;

  const skip = (pageNumber - 1) * limit;

  let taskCategoryIds = [];
  if (taskCategories) {
    taskCategoryIds = JSON.parse(taskCategories).map((id) => toObjectId(id));
  }

  const matchPipeline = [
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
  ];

  const tasks = await aggregateWithPagination(UserTasks, matchPipeline, pageNumber, limit);
  return tasks;
};

const controller = catchResponse(async (req, res) => {
  const result = await listTask(req);
  return { result };
});

module.exports = { listTask: controller };
