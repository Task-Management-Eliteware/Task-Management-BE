const { catchResponse } = require('../../res-handler');

const updateTask = async (req) => {
  return { data: 'abc' };
};

const controller = catchResponse(async (req, res) => {
  const result = await updateTask(req);
  return { result, statusCode: 201 };
});

module.exports = { updateTask: controller };
