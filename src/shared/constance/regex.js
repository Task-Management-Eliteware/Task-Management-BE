const REGEX = {
  NAME: /^[a-zA-Z ]{2,20}$/,
  EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  MONOGID: /^[a-f\d]{24}$/i
};

module.exports = { REGEX };
