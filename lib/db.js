import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    console.log('MongoDB URI:', process.env.MONGO_URI); // Debugging line
    const db = await mongoose.connect(process.env.MONGO_URI);

    isConnected = db.connection.readyState === 1; // Correct access to first connection
    console.log('New database connection');
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};
