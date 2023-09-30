const { catchResponse } = require('../../res-handler');

const deleteTask = async (req) => {
  return { data: 'abc' };
};

const controller = catchResponse(async (req, res) => {
  const result = await deleteTask(req);
  return { result, statusCode: 201 };
});

module.exports = { deleteTask: controller };
