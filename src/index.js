import dotenv from "dotenv"; // Import dotenv to load environment variables
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({  path: "./.env"}) // Load environment variables from .env file

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000)
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
})
.catch((error) => {
    console.error("Failed to connect to the database:", error);
});



















// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";


/*
import express from "express";
const app = express();
( async () => {
    try {
       await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
       app.on("error", (err) => {
           console.error("Server error:", err);
           throw err;
       })

       app.listen(process.env.PORT, () => {
           console.log(`Server is running on port ${process.env.PORT}`);
       })


    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
 })()

 */