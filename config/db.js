import mongoose from "mongoose";
import colors from "colors";

const RECONNECT_TIME = 5 * 60 * 1000; // 5 minutes

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB Connected: ${conn.connection.host}`.underline.green
    );
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);

    console.log(
      `Reconnecting to MongoDB in 5 minutes...`.yellow
    );

    setTimeout(connectDB, RECONNECT_TIME);
  }
};

/* Handle runtime disconnection */
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!".red.bold);
  console.log("Trying to reconnect in 5 minutes...".yellow);

  setTimeout(connectDB, RECONNECT_TIME);
});

/* Optional: log errors */
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB error: ${err.message}`.red.bold);
});

export default connectDB;
