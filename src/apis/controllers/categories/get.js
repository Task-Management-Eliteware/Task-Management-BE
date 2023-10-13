const { UserTasks } = require('../../../db');
const { Api404Error } = require('../../../shared');
const { catchResponse } = require('../../res-handler');

const getCategory = async (req) => {
  const { taskId } = req.params;
  const { _id: userId } = req.authorizedUser;
  const task = await UserTaskCategories.findOne({
    _id: taskId,
    userId,
    isActive: true
  }).lean();
  if (!task) throw new Api404Error('No task found.');

  task.taskId = task._id;
  delete task._id;
  return task;
};

const controller = catchResponse(async (req, res) => {
  const result = await getCategory(req);
  return { result, statusCode: 200 };
});

module.exports = { getCategory: controller };
