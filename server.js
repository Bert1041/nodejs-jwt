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
      { url: "/users/login", methods: ["POST"] },
      { url: "/users/register", methods: ["POST"] },
      { url: "/users/otpLogin", methods: ["POST"] },
      { url: "/users/verifyOTP", methods: ["POST"] },
    ],
  })
);

app.use(express.json());

// initialize routes
app.use("/users", require("./routes/users.routes"));

// middleware for error responses
app.use(errors.errorHandler);

// listen for requests
//If connection to db is succesful then connect to server
const PORT = process.env.PORT || 4000;
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
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
