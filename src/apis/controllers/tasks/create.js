const { catchResponse } = require('../../res-handler');

const createTask = async (req) => {
  return { data: 'abc' };
};

const controller = catchResponse(async (req, res) => {
  const result = await createTask(req);
  return { result, statusCode: 201 };
});

module.exports = { createTask: controller };
