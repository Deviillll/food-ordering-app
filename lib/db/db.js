import mongoose from 'mongoose';

const connectDb = async () => {
    const connection = mongoose.connection;
    if (connection.readyState === 1) {
        console.log("Already connected");
        return;
    }
    try {
       // Verify the URI
        await mongoose.connect(process.env.MONGO_URI || "",{
            useNewUrlParser: true,
        
        });
        console.log("MongoDB connected");
        console.log(mongoose.connection.readyState);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

export default connectDb;
