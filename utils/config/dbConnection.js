import mongoose from 'mongoose';

// اتصال به دیتابیس (با کش کردن اتصال)
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;
  
  try {
    console.log('Connecting to MongoDB...');
    cached.conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully');
    return cached.conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default dbConnect;