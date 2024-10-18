import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log(`Database Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default connectDb;
