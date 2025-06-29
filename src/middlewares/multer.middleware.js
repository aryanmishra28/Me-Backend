import multer from "multer"; //Imports the multer library. Multer is used in Express apps to handle file uploads like images, videos, etc.

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

// | Property      | Purpose                        | Analogy                                                    |
// | ------------- | ------------------------------ | ---------------------------------------------------------- |
// | `destination` | Where the file should be saved | "Store this file in the temp room" (`./public/temp`)       |
// | `filename`    | What name the file should have | "Keep the same name as the original" (`file.originalname`) |


export const upload = multer({ storage: storage })
//Creates a reusable upload middleware using the storage settings, and exports it.




//📷 Middleware that handles file uploads (e.g., images/videos) from the frontend.
// - Uses `multer` to handle file uploads.
// - Files are stored in a temporary directory (`./public/temp`).


// How It Connects to Everything
// Frontend Form (with file input)
//     ↓
// POST /api/v1/users/register (multipart/form-data)
//     ↓
// upload.single("avatar") (multer middleware)
//     ↓
// Stores file at: ./public/temp/
//     ↓
// Next: Cloudinary upload (in controller)
//     ↓
// Save Cloudinary URL to MongoDB
