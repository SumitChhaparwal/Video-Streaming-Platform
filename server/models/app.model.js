import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;
db.on("open", () => {
  console.log("Successfully connected to the database..");
});

db.on("error", () => {
  console.log("Failed to connect the database..");
});

//creating schema for users
const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  channels: {
    type: [String],
    default: [],
  },
});

export const users = mongoose.model("users", usersSchema);



