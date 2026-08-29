import { channel, subscribe } from "diagnostics_channel";
import mongoose, { mongo } from "mongoose";
import { type } from "os";

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
//users model 
export const users = mongoose.model("users", usersSchema);

//creating schema for channel
const channelSchema = mongoose.Schema({
  channelName: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
    default: "Welcome this channel, Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid odio consectetur voluptates ab. Laudantium eaque totam nemo voluptate facilis corrupti ipsa? Nobis, nemo adipisci reprehenderit excepturi itaque aliquam tempora sunt.",  
  },
  bannerImg: {
    type: String,
    required: true,
    default: "https://yt3.googleusercontent.com/B5iaLfhJJ65Gh20ZsOaXJZ6eeKCoLzoU-rtFQcYncWSs_j5SFYi5p80kChpSnX6xO54to0q4EXo=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
  },
  subscribers: {
    type: String,
    required: true,
    default: "21.1k",
  },
  videos: [String],
  default: [],
});

//creating channel model..
export const channelM = mongoose.model("channel", channelSchema);


