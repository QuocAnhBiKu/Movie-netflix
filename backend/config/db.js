import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async() => {

 try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URL);
    console.log("Mongoose Connect: "+ conn.connection.host)
 } catch (error) {
    console.error("Couldn't connect to Mongoose: " + error.message);
    process.exit(1);
    
 }
}