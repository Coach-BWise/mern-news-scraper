import mongoose, { Error } from "mongoose";
import env from '../util/validateEnv';

const connectDB = async () => {

    try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("MongoDB Connected...");
    } catch (err: any) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;
