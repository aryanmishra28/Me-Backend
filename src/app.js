import express from "express"  //  web framework for building APIs and web apps easily
// This file sets up the Express application with middleware for handling requests, CORS, and cookies.

import cors from "cors"    // allow backend to be accessed by frontend
// the CORS middleware — used to allow requests from other domains or frontends.
// For example, if your frontend is at http://localhost:3000 and your backend is at http://localhost:5000, you need CORS to allow the frontend to talk to the backend.

import cookieParser from "cookie-parser" //This middleware allows you to **read cookies** sent by the client (used in login, sessions, etc.).

const app = express()

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
))
// ✅ **CORS Setup**:
// - Allows **cross-origin requests** (from frontend).
// - `origin: process.env.CORS_ORIGIN`: Allows requests only from your allowed frontend domain (you’ll set this in `.env`, like `http://localhost:3000`)
// - `credentials: true`: Allows cookies or auth headers to be sent.

// 🟡 Example `.env` line:
// ```env
// CORS_ORIGIN=http://localhost:3000


app.use(express.json({limit: "10kb"}))
// ✅ Parses **incoming JSON** data from the request body.
// 💡 `limit: "10kb"`: Limits the size of the incoming JSON to prevent abuse.

app.use(express.urlencoded({
    extended: true,
    limit: "10kb"
}))
app.use(express.static("public"))
app.use(cookieParser())


//routes
import userRoutes from "./routes/user.routes.js"

// 💡 So, what's happening?
// ✅ You're importing a group of routes from user.routes.js
// ✅ You assign it the name userRoutes
// ✅ Then you tell your Express app:
// “Use this group of routes, and prefix them with /api/v1/users.”



//routes declaration
app.use("/api/v1/users", userRoutes)

// https://localhost:8000/api/v1/users/register


export { app }