const { UserTasks, UserTaskCategories } = require('../../../db');
const { Api404Error, toObjectId } = require('../../../shared');
const { catchResponse } = require('../../res-handler');

const createTask = async (req) => {
  const { taskTitle, taskDescription, taskCategoryId, taskPriorities } = req.body;
  const { _id: userId } = req.authorizedUser;
  const findCategoryQuery = { userId, categoryType: 'none', isActive: true };
  if (taskCategoryId) {
    delete findCategoryQuery.categoryType;
    findCategoryQuery._id = taskCategoryId;
  }
  const category = await UserTaskCategories.findOne(findCategoryQuery).lean();
  if (!category) {
    throw new Api404Error('Category not exists.');
  }
  const task = await UserTasks.create({ taskTitle, taskDescription, taskPriorities, userId, taskCategoryId: category._id });
  return task;
};

const controller = catchResponse(async (req, res) => {
  const result = await createTask(req);
  return { result, statusCode: 201 };
});

module.exports = { createTask: controller };
