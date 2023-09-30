const { catchResponse } = require('../../res-handler');

const listTask = async (req) => {
  return { data: 'abc' };
};

const controller = catchResponse(async (req, res) => {
  const result = await listTask(req);
  return { result, statusCode: 201 };
});

module.exports = { listTask: controller };
