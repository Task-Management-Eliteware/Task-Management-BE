const stringToArray = (input) => {
  const valuesAsString = input.slice(1, -1);
  const valuesArray = valuesAsString.split(',');
  return valuesArray;
};

module.exports = { stringToArray };
