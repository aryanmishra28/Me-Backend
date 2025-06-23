import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
   const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
}

export default connectDB;





























// ## ✅ The Code:

// ```js
// const connectDB = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1); // Exit the process with failure
//   }
// }
// ```

// ---

// ## 🔍 Line-by-Line Explanation

// ### 🔹 `const connectDB = async () => { ... }`

// * You’re declaring an **async function** (because connecting to a database takes time).
// * `connectDB` is the function name, and you will call this from your `index.js` file to connect to MongoDB.

// ---

// ### 🔹 `await mongoose.connect(...)`

// ```js
// await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
// ```

// * `mongoose.connect(...)` is a function that connects your app to MongoDB.
// * You're using the **MongoDB URI from `.env`** like this:

//   ```env
//   MONGODB_URI = mongodb+srv://yourUser:yourPass@cluster.mongodb.net
//   ```
// * `DB_NAME` is imported from `constants.js`, so your full URL becomes:

//   ```
//   mongodb+srv://.../yourDatabaseName
//   ```
// * `await` waits until the connection is established **before moving forward**.

// ---

// ### 🔹 `console.log(...)`

// ```js
// console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
// ```

// * If the connection is successful, this logs the **host/server** MongoDB is connected to.
// * Helpful for debugging and confirming it’s working.

// ---

// ### 🔹 Error Handling

// ```js
// } catch (error) {
//   console.error("Error connecting to MongoDB:", error);
//   process.exit(1);
// }
// ```

// * If the connection fails:

//   * Logs the error message
//   * `process.exit(1)` stops the server from running. This is good, because you don’t want your app running if it can’t connect to the database.

// ---

// ## 📦 Summary of What It Does

// | Step | Action                                                 |
// | ---- | ------------------------------------------------------ |
// | 1️⃣  | Builds full MongoDB URI from `.env` and `constants.js` |
// | 2️⃣  | Tries to connect using `mongoose.connect()`            |
// | 3️⃣  | If successful → logs connected host                    |
// | 4️⃣  | If failed → logs error and stops the server            |

// ---

// ## 🍽️ Real-World Analogy

// Imagine you're opening a restaurant:

// * `mongoose.connect(...)` is like connecting to your **food supplier**
// * If the supplier is available, you log their name and start operations
// * If not, you **don’t open the restaurant at all** (`process.exit(1)`)

// ---

