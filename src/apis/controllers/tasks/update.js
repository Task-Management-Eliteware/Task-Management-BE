const { UserTasks } = require('../../../db');
const { Api404Error } = require('../../../shared');
const { catchResponse } = require('../../res-handler');

const updateTask = async (req) => {
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
  if (!task) {
    throw new Api404Error('No task found.');
  }
  return task;
};

const checkedTask = async (req) => {
  const { taskId, isCompleted } = { ...req.body, ...req.params };
  const { _id: userId } = req.authorizedUser;
  const task = await UserTasks.findOneAndUpdate(
    { _id: taskId, userId, isActive: true },
    {
      isCompleted: isCompleted,
    }
  );

  if (!task) {
    throw new Api404Error('No task found.');
  }

  return task;
};

const updateController = catchResponse(async (req, res) => {
  await updateTask(req);
  return;
});

const checkedTaskController = catchResponse(async (req, res) => {
  await checkedTask(req);
  return;
});

module.exports = { updateTask: updateController, checkedTask: checkedTaskController };
