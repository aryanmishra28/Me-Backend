import { asyncHandler } from "../utils/asyncHandler";
import User from "../models/user.model.js"; // Importing the User model
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js"; // Importing ApiError for error handling

export const verifyJWT =  asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

        if (!token) {
            throw new ApiError(401, "Access Token is required");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

       const user = await User.findById(decodeToken?._id).select("-password -refreshToken")
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user; // Attach the user to the request object
        next(); // Call the next middleware or route handler

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token");

    }
})
