const { UserTasks } = require('../../../db');
const { Api404Error } = require('../../../shared');
const { catchResponse } = require('../../res-handler');

const deleteTask = async (req) => {
  const { taskId } = req.params;
  console.log('🚀 ~ file: delete.js:7 ~ deleteTask ~ taskId:', taskId);
  const { _id: userId } = req.authorizedUser;
  const task = await UserTasks.findOneAndUpdate(
    { _id: taskId, userId, isActive: true },
    {
      isActive: false,
    },
    {
      new: true,
    }
  ).lean();
  if (!task) throw new Api404Error('No task found.');
  return task;
};

const controller = catchResponse(async (req, res) => {
  const result = await deleteTask(req);
  return { result, statusCode: 200 };
});

module.exports = { deleteTask: controller };
