import mongoose from 'mongoose';

class MongooseServices {
  private count = 0;
  private mongooseOptions = {
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 5000,
  };

  constructor() {
    this.connectWithRetry();
  }

  getMongoose() {
    return mongoose;
  }

  connectWithRetry = () => {
    console.log('Attempting MongoDB connection (will retry if needed)');
    mongoose
      .connect(process.env.DATABASE_URL as string, this.mongooseOptions)
      .then(() => {
        console.log('MongoDB is connected');
      })
      .catch((err) => {
        const retrySeconds = 5;
        console.log(`MongoDB connection unsuccessful (will retry #${++this.count} after ${retrySeconds} seconds):`, err);
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  };
}

export default new MongooseServices();
