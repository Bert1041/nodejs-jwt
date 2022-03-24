const mongoose = require("mongoose");
// connect to mongodb

/**
 * With useNewUrlParser: The underlying MongoDB driver has deprecated their current connection string parser.
 * Because this is a major change, they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser.
 * You should set useNewUrlParser: true unless that prevents you from connecting.
 *
 * With useUnifiedTopology, the MongoDB driver sends a heartbeat every heartbeatFrequencyMS to check on the status of the connection.
 * A heartbeat is subject to serverSelectionTimeoutMS , so the MongoDB driver will retry failed heartbeats for up to 30 seconds by default.
 */
//mongoose.Promise = global.Promise;
const connectDB = async () => {
  try {
    const dbconn = await mongoose.connect(process.env.DATABASE_URI, {
      //prevent warning that we will get from mongoDb
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${dbconn.connection.host}`);
  } catch (err) {
    console.error(err);
  }
};
module.exports = connectDB;

// mongoose
//   .connect(connectDB.db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(
//     () => {
//       console.log("Database connected");
//     },
//     (error) => {
//       console.log("Database can't be connected: " + error);
//     }
//   );
