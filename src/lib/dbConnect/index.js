import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}


async function dbConnect() {
  const opts = {
    bufferCommands: false,
  };
  try {
    await mongoose.connect(MONGODB_URI, opts);
    console.log("DB connected");
  } catch (e) {
    console.error("There has been an error connecting to the DB", e);
  }
}

export default dbConnect;
