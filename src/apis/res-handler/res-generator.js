const defaultMessage = 'Success';

const filterRequest = (httpMethod, resMessage, result) => {
  let message;
  let statusCode;
  switch (httpMethod) {
    case 'GET':
      message = resMessage || defaultMessage;
      statusCode = 200;
      break;

    case 'POST':
      message = resMessage || defaultMessage;
      statusCode = 201;
      break;

    case 'PATCH':
      message = resMessage || defaultMessage;
      statusCode = 200;
      break;

    case 'PUT':
      message = resMessage || defaultMessage;
      statusCode = 200;
      break;

    case 'DELETE':
      message = resMessage || defaultMessage;
      statusCode = 200;
      break;

    default:
      break;
  }
  return { statusCode, message, result };
};

const responseGenerator = (ctrResponse) => {
  const { httpMethod, result, statusCode, resMessage } = ctrResponse;

  if (statusCode) {
    return { statusCode, message: resMessage || defaultMessage, result };
  }

  return filterRequest(httpMethod, resMessage, result);
};

module.exports = { responseGenerator };
