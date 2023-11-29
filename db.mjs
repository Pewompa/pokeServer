import { connect } from 'mongoose';
import { config } from 'dotenv';

config();

const uri = process.env.MONGODB_URI;
export const connectDB = async () => {
  try {
    await connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('connected to db');
  } catch (error) {
    console.log(error);
  }
};
