const { UserTasks } = require('../../../db');
const { collections, toObjectId, stringToArray } = require('../../../shared');
const { catchResponse } = require('../../res-handler');

const listTask = async (req) => {
  const {
    taskCategories,
    pageNumber = 1,
    limit = 10,
    sortByField = 'createdAt',
    sortOrder = -1
  } = req.query;

  const { _id: userId } = req.authorizedUser;

  const skip = (pageNumber - 1) * limit;

  let taskCategoryIds = [];
  if (taskCategories) {
    taskCategoryIds = JSON.parse(taskCategories).map((id) => toObjectId(id));
  }

  const [tasks] = await UserTasks.aggregate([
    {
      $match: {
        userId: userId,
        isActive: true
      }
    },
    {
      $lookup: {
        from: collections.UserTaskCategories,
        foreignField: '_id',
        localField: 'taskCategoryId',
        as: 'tasksCategory'
      }
    },
    {
      $unwind: '$tasksCategory'
    },
    {
      $match: {
        $or: [
          { 'tasksCategory._id': { $in: taskCategoryIds } }, // if taskCategoryIds is not empty
          {
            $expr: {
              $eq: [taskCategoryIds, []] // if taskCategoryIds is empty
            }
          }
        ]
      }
    },
    {
      $sort: {
        [sortByField]: +sortOrder
      }
    },
    {
      $group: {
        _id: null,
        list: { $push: '$$ROOT' }
      }
    },
    { $project: { _id: 0 } },
    {
      $project: {
        totalCount: { $size: '$list' },
        list: { $slice: ['$list', skip, +limit] }
      }
    },
    {
      $project: {
        results: { $size: '$list' },
        totalRecords: '$totalCount',
        taskList: '$list'
      }
    }
  ]);

  return {
    data: tasks?.taskList || [],
    pagination: {
      page: +pageNumber,
      pageSize: tasks?.results || 0,
      totalRecords: tasks?.totalRecords || 0
    }
  };
};

const controller = catchResponse(async (req, res) => {
  const result = await listTask(req);
  return { result };
});

module.exports = { listTask: controller };
