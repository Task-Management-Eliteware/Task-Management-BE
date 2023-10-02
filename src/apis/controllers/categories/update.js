const { UserTasks } = require('../../../db');
const { catchResponse } = require('../../res-handler');

const updateCategory = async (req) => {
  const { taskId, taskTitle, taskDescription, taskCategory, taskPriorities } = { ...req.body, ...req.params };
  const { _id: userId } = req.authorizedUser;
  const task = await UserTasks.findOneAndUpdate(
    { _id: taskId, userId, isActive: true },
    {
      taskTitle,
      taskDescription,
      taskCategory,
      taskPriorities,
    }
  );
  return task;
};

const controller = catchResponse(async (req, res) => {
  const result = await updateCategory(req);
  return { statusCode: 200 };
});

module.exports = { updateCategory: controller };
