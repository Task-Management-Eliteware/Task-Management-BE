const { UserTasks } = require('../../../db');
const { catchResponse } = require('../../res-handler');

const createTask = async (req) => {
  const { taskTitle, taskDescription, taskCategory, taskPriorities } = req.body;
  const { _id: userId } = req.authorizedUser;
  const task = await UserTasks.create({ taskTitle, taskDescription, taskCategory, taskPriorities, userId });
  return task;
};

const controller = catchResponse(async (req, res) => {
  const result = await createTask(req);
  return { result, statusCode: 201 };
});

module.exports = { createTask: controller };
