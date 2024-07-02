import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/next-task';

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      
    });
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1); // Exit with failure
  }
};

export default dbConnect;
