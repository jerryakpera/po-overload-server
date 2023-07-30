import mongoose from 'mongoose';

async function connectDB(MONGODB_URI: string) {
  try {
    console.log('DB Connected');
    return await mongoose.connect(MONGODB_URI);
  } catch (e) {
    throw e;
  }
}

function closeDB() {
  console.log('DB Disconnected');
  return mongoose.connection.close();
}

function dropDB() {
  console.log('DB Dropped');
  return mongoose.connection.db.dropDatabase();
}

export { connectDB, closeDB, dropDB };
