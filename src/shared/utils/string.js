const { Api400Error } = require('../error-handler');

const stringToArray = (input) => {
  try {
    return JSON.parse(input);
  } catch (err) {
    throw new Api400Error('Invalid array input');
  }
  // const valuesAsString = input.slice(1, -1);
  // const valuesArray = valuesAsString.split(',');
  // return valuesArray;
};

module.exports = { stringToArray };
