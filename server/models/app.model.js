import mongoose from "mongoose";
import { vidData } from "./default.js";

//conneting to mongodb through mongoose
mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;
//only run once when database connection successfully open..
db.once("open", async () => {
  console.log("Successfully connected to the database..");
  //run when db connection establish..
  await seedDatabase();
});

db.on("error", () => {
  console.log("Failed to connect the database..");
});


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
  },
  u_name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default:
      "Welcome this channel, Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid odio consectetur voluptates ab. Laudantium eaque totam nemo voluptate facilis corrupti ipsa? Nobis, nemo adipisci reprehenderit excepturi itaque aliquam tempora sunt.",
  },
  bannerImg: {
    type: String,
    default:
      "https://yt3.googleusercontent.com/B5iaLfhJJ65Gh20ZsOaXJZ6eeKCoLzoU-rtFQcYncWSs_j5SFYi5p80kChpSnX6xO54to0q4EXo=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
  },
  subscribers: {
    type: String,
    default: "21.1k",
  },
  videos: {
    type: [String],
    default: [],
  },
});
//creating channel model..
export const channelM = mongoose.model("channel", channelSchema);


//creating schema for comments
const commentsSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, //Automatically adds createdAt and updatedAt
);
//creating model for comments
export const Comments = mongoose.model("Comments", commentsSchema);


//creating schema for video
const videoSchema = mongoose.Schema({
  videoId: {
    type: String,
    required: true,
  },
  channelFavicon: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: true,
  },
  views: {
    type: String,
    required: true,
  },
  likes: {
    type: String,
    required: true,
  },
  dislike: {
    type: String,
    default: null,
  },
  uploadDate: {
    type: String,
    default: new Date(),
  },
  ago: {
    type: String,
    default: "10 days",
  },
  category: {
    type: String,
    required: true,
    default: "tech newtoyou all",
  },
  //Arr of obj(comment_id) pointing to the separate Comment model..
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});
//creating video model
export const Video = mongoose.model("Video", videoSchema);


//seedDb func() to store multi vid objs data in Video Collection
const seedDatabase = async () => {
  try {
    const videoObjCount = await Video.countDocuments();
    if (videoObjCount == 0) {
      await Video.insertMany(vidData);
      console.log("Default videos added successfully for testing..");
    } else {
      console.log("Video model already have vid objs data..");
    }
  } catch (error) {
    console.log("//Error occurs while auto seeding database: ", error);
  }
};
