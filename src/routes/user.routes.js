import { Router } from "express"; //Imports the Router() feature from Express so you can define routes in a modular way.
import { registerUSer } from "../controllers/user.controller.js"; //Brings in the registerUSer controller function that handles the signup logic.

import{upload} from "../middlewares/multer.middleware.js" //Imports the upload middleware to handle incoming file uploads (avatar and cover image).



const router = Router() //Creates a new instance of the Express Router, which will be used to define user-related routes.
//🧠 Like having a separate entry gate just for user-related requests.

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUSer
)

//| Part                        | Explanation                                                          |
// | --------------------------- | -------------------------------------------------------------------- |
// | `router.route("/register")` | Defines a POST route at `/api/v1/users/register`                     |
// | `upload.fields([...])`      | Tells multer to accept multiple file fields from the frontend        |
// | `registerUSer`              | Calls your controller to handle the rest (validation, DB save, etc.) |
//User enters → clerk collects avatar + cover → passes to receptionist → receptionist checks info → registers user.


export default router


//📬 Defines routes for user-related actions like registration, login, etc.
// - We import the necessary modules: `Router` from Express, the `registerUSer` controller function, and the `upload` middleware for handling file uploads.
// - We create a new router instance using `Router()`.


// How It Connects to Everything
// Frontend Form → /api/v1/users/register
//        ↓
// user.routes.js
//        ↓
// upload.fields() (handles file upload)
//        ↓
// registerUSer() (handles user creation)
//        ↓
// Saves to DB → Sends response
