import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import { User } from '../models/user.model.js'; // Adjust path if needed
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // ✅ Adjust the path as needed
import { ApiResponse } from "../utils/apiResponse.js"; // Importing ApiResponse to send structured responses




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

const { username, email, fullName, password} = req.body //Pulls the submitted user info from the frontend request (req.body).
console.log("email", email);
if(
    [fullName, username, email, password].some((field) => field?.trim() === "")
    //Makes sure none of the fields are empty or just spaces.
    //.some() goes through the array and checks if any field is blank.
)
{
    throw new ApiError(400, "All fields are required")
}
const existedUSer = await User.findOne({
    $or: [{ email }, { username }]

    //Looks in the database for any user with the same email or username.
    //$or means it will match if either one is found.
})
if (existedUSer) {
    throw new ApiError(400, "User already exists")
}

console.log("req.files", req.files);

const avatarLocalPath = req?.files?.avatar[0]?.path; // Gets the path of the uploaded avatar file.
// const coverImageLocalPath = req?.files?.coverImage[0]?.path;

//we use below code to check if coverImage is provided
// If coverImage is not provided, it will be undefined

let coverImageLocalPath; // if coverImage is not provided, it will be undefined
if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path;
}

// Get Uploaded File Paths
// Multer stores files temporarily on disk → we extract their paths here.
// These paths are used to upload to Cloudinary.
// 🧠 Analogy: Files are saved in your local folder — you grab their location.

if(!avatarLocalPath)
{
    throw new ApiError(400, "Avatar is required")
}

const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)
// Sends local files to Cloudinary
// Returns a response with the hosted file URL

if(!avatar){
    throw new ApiError(400, "Avatar file is required")
}

const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
})

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
    //It fetches the newly created user again, but removes the password and refreshToken from the result.
)

// | Step                                                   | What it Does                                           |
// | ------------------------------------------------------ | ------------------------------------------------------ |
// | `User.create(...)`                                     | Saves the user, including password and refreshToken    |
// | `User.findById(...).select("-password -refreshToken")` | Safely fetches user without private fields             |
// | Result                                                 | You can send this object back to the frontend securely |


if(!createdUser)
{
    throw new ApiError(400, "User creation failed")

}

return res.status(201).json(
    new ApiResponse(201, "User created successfully", createdUser)
);


})


export { registerUSer }









//this is where the frontend will send the data to register a user
//this is where the backend will handle the registration logic
// first controller function (registerUser) — this is where your backend starts talking to the frontend and interacts with the database.

//               Flow
// Frontend sends user info + files → /register route
//   ↓
// Multer handles files (avatar, coverImage) → stored in public/temp
//   ↓
// Controller (registerUser):
//   - Validates inputs
//   - Checks if user exists
//   - Uploads avatar and cover to Cloudinary
//   - Saves user in DB
//   - Returns user data (without password)
//   ↓
// Response sent to frontend with success message

// | Section                       | Purpose                              |
// | ----------------------------- | ------------------------------------ |
// | `req.body`                    | Get user input from frontend         |
// | `.some(...)`                  | Validates all fields are filled      |
// | `User.findOne()`              | Checks if user already exists        |
// | `req.files.avatar/coverImage` | Get file path from multer            |
// | `uploadOnCloudinary()`        | Uploads file to Cloudinary           |
// | `User.create()`               | Saves user to DB                     |
// | `.select("-password")`        | Removes sensitive info from response |
// | `ApiError`                    | Sends clean error messages           |
// | `ApiResponse`                 | Sends clean success responses        |

