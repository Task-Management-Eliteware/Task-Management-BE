const mongoose = require('mongoose');
const dbUrl = process.env.DATABASE_URL;

const createDBConnection = async () => {
  try {
    const dbConnection = await mongoose.connect(dbUrl);
    const { host, port, name } = dbConnection.connection;
    console.log('Data base connected.', { host, port, name });
  } catch (err) {
    console.error("can't connect database", err);
    process.exit(1);
  }
};

module.exports = { createDBConnection };
