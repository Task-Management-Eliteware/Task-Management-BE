const bcrypt = require('bcrypt');

const salt = process.env.BCRYPT_SALT;

const crateHash = (str) => {
  const hash = bcrypt.hashSync(str, +salt);
  return hash;
};

const compareHash = (hash1, hash2) => {
  const isEqual = bcrypt.compareSync(hash1, hash2);
  return isEqual;
};

module.exports = { crateHash, compareHash };
