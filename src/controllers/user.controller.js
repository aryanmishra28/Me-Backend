import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";

const registerUSer = asyncHandler(async (req, res) => {
// res.status(200).json({
//     message:"Chai and code"
// })



//get user details from frontend
//validate the user details
//check if user already exists : email or username
//if user does not exist, create a new user
//check for images, avatar, cover image
//upload images to cloudinary
//create user object - create entry in db
///remove password and refresh token from response
//check for user creation success
//send response to frontend

const { username, email, fullName, password} = req.body
console.log("email", email);


})


export { registerUSer }