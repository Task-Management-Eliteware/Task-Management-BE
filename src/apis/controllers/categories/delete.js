const { UserTasks } = require('../../../db');
const { Api404Error } = require('../../../shared');
const { catchResponse } = require('../../res-handler');

const deleteCategory = async (req) => {
  const { taskId } = req.params;
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
  const result = await deleteCategory(req);
  return { result, statusCode: 200 };
});

module.exports = { deleteCategory: controller };
