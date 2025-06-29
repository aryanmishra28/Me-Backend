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
if(
    [fullName, username, email, password].some((field) => field?.trim() === "")
)
{
    throw new ApiError(400, "All fields are required")
}
const existedUSer = User.findOne({
    $or: [{ email }, { username }]
})
if (existedUSer) {
    throw new ApiError(400, "User already exists")
}

const avatarLocalPath = req?.file?.avatar[0]?.path;
const coverImageLocalPath = req?.file?.coverImage[0]?.path;

if(!avatarLocalPath)
{
    throw new ApiError(400, "Avatar is required")
}

const avatar = await uploadOnCloudinary(avatarLocalPath,)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

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
)

if(!createdUser)
{
    throw new ApiError(400, "User creation failed")

}

return res.status(201).json(
    new ApiResponse(200, "User created successfully")
)

})


export { registerUSer }









//this is where the frontend will send the data to register a user
//this is where the backend will handle the registration logic
// first controller function (registerUser) — this is where your backend starts talking to the frontend and interacts with the database.