import mongoose from 'mongoose';


const connectDb = async () => {
    const connection = mongoose.connection;
    if(connection.readyState==1)
    {
        console.log("Already connected");
        return;
    }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    console.log(mongoose.connection.readyState);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
export default connectDb;