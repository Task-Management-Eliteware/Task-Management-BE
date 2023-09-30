const { catchResponse } = require('../../res-handler');

const getTask = async (req) => {
  return { data: 'abc' };
};

const controller = catchResponse(async (req, res) => {
  const result = await getTask(req);
  return { result, statusCode: 201 };
});

module.exports = { getTask: controller };
