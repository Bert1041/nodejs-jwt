require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/db.config");
const auth = require("./middlewares/auth.js");
const errors = require("./middlewares/errors.js");
const unless = require("express-unless");

// connect to MongoDB
connectDB();

// middleware for authenticating token submitted with requests
/**
 * Conditionally skip a middleware when a condition is met.
 */
auth.authenticateToken.unless = unless;
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: "/api/users/login", methods: ["POST"] },
      { url: "/api/users/register", methods: ["POST"] },
      { url: "/api/users/otpLogin", methods: ["POST"] },
      { url: "/api/users/verifyOTP", methods: ["POST"] },
    ],
  })
);

app.use(express.json());

//route file
const userRouter = require("./routes/users.routes");
// initialize routes
app.use("/api/users", userRouter);

// middleware for error responses
app.use(errors.errorHandler);

// listen for requests
//If connection to db is succesful then connect to server
const PORT = process.env.PORT || 5000;
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(
    PORT,
    console.log(
      `Server running....... Now listening for request on port ${PORT}`
    )
  );
});

// app.listen(process.env.port || 4000, function () {
//   console.log("Ready to Go!");
// });
