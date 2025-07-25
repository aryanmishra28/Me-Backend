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


//Method 2
// import express from "express";  //You’re importing Express so you can create a router.
// import { registerUser } from "../controllers/user.controller.js";
// import upload from "../middlewares/multer.middleware.js";

// const router = express.Router();  //because imported express to create router

// route => /api/v1/users/register
// router.post("/register", upload.fields([
//   { name: "avatar", maxCount: 1 },
//   { name: "coverImage", maxCount: 1 },
// ]), registerUser);

// export default router;



// ✅ Option 1:
// import express from "express";
// const router = express.Router();
// ✅ What's happening:
// You're importing the entire express module
// Then using express.Router() to create the router

// ✅ Common when:
// You need to use multiple features of Express (e.g., express.json(), express.static())
// You want simplicity in small files

// ✅ Option 2:
// import { Router } from "express";
// const router = Router();
// ✅ What's happening:
// This is destructuring only the Router function directly from Express
// Then you use Router() without needing the whole module

// ✅ Common when:
// You only need the Router (nothing else from express)
// You're aiming for minimal, clean imports in modular route files