import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { users, channelM } from "./models/app.model.js";
import bcrypt from "bcrypt";
import { Video } from "./models/app.model.js";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Explicitly point to the .env file in the root directory
dotenv.config({ path: path.join(__dirname, "../.env") });

//creating express app
const app = express();
//setting port
const port = 3200;

//setting CORS
app.use(
  cors({
    origin: "http://localhost:5173", //Vite Frontend Origin URL
    credentials: true, //allows cookies/authorized headers
  }),
);

//using built in middleware to access json, including uploaded image data URLs
app.use(express.json({ limit: "10mb" }));

//creating reusable authentication middleware func to verify token
const authenticateUser = (req, res, next) => {
  //accessing authentication header
  const authHeader = req.headers.authorization;

  //check if authorization header exists
  if (!authHeader) {
    return res.status(401).json({ msg: "Authorization header is missing" });
  }

  //check if authorization header exists
  if (!authHeader) {
    return res.status(401).json({ msg: "Authorization header is missing" });
  }

  //extracting token
  const userToken = authHeader.split(" ")[1];

  //check token value
  if (!userToken) {
    return res.status(401).json({ msg: "Token is Empty/Invalid" });
  }
  //accessing .env secretKey var
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    return res
      .status(500)
      .json({ msg: "Secret_Key is undefined, So check it!" });
  }

  jwt.verify(userToken, secretKey, (err, decode) => {
    if (err) {
      return res.status(401).json({ msg: "User token is Invalid!" });
    }
    req.user = decode;
    //to continue next middleware/route..
    next();
  });
};

//**User Authentication**
// creating RESTAPIs to SignUp using post method..
app.post("/api/signup", async (req, res) => {
  const payload = req.body;
  //checking payload data
  if (!payload) {
    return res.status(400).json({ msg: "Form data is incomplete!" });
  }

  //checking props are undefined or not
  const { username, email, password } = payload;
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Invalid/Empty data is sent!" });
  }

  //performing form data validation
  if (username.length < 5) {
    return res.status(400).json({ msg: "Add at least 5 characters to Name!" });
  }
  if (password.length < 6) {
    return res.status(400).json({ msg: "Password length is too small!" });
  }

  //checking existing user by email mean that user is new or not
  const existingUserE = await users.findOne({ email });
  if (existingUserE) {
    return res.status(401).json({ msg: "User already Signup!" });
  }
  const existingUserN = await users.findOne({ username });
  if (existingUserN) {
    return res.status(400).json({ msg: "Enter unique name!" });
  }

  //Performing secure password hashing through Bcrypt
  const saltRound = 11;
  const hashedPassword = await bcrypt.hash(password, saltRound);

  //storing data in backend..
  //creating document obj in users model
  const usersD = await users.create({
    username,
    email,
    password: hashedPassword,
  });

  if (!usersD) {
    return res.status(401).json({ msg: "Invalid data is submitted!" });
  }

  //accesing .env var
  const secret_key = process.env.SECRET_KEY;

  //setting expire date for token
  const expire = {
    expiresIn: "1h",
  };

  //creating jwt token based on payload..
  const token = jwt.sign(payload, secret_key, expire);
  res.send({ newToken: token });
});

// creating RESTAPIs to SignIn using post method..
app.post("/api/auth/signin", authenticateUser, async (req, res) => {
  const userData = req.body;
  if (!userData) {
    return res.status(400).json({ err: "Data is Empty!" });
  }
  const { email, password } = userData;
  if (!email || !password) {
    return res.status(400).json({ err: "Invalid data!" });
  }

  //checking user account created or not
  const foundU = await users.findOne({ email });
  if (!foundU) {
    return res
      .status(401)
      .json({ err: "Wrong Email. User Account isn't Created!" });
  }

  //bcrypt checking written password via compare() with hashed password
  const isPasswordValid = await bcrypt.compare(password, foundU.password);
  console.log("isPasswordValid ", isPasswordValid);
  if (!isPasswordValid) {
    return res.status(401).json({ err: "Wrong Password. Try Again!" });
  }
  res.send({
    data: foundU,
    msg: "You Sign In Successfully!",
  });
});

//**Channel Management**
//creating RESTAPI to create new channel..
app.post("/api/auth/createnewchannel", async (req, res) => {
  const payloadD = req.body;
  if (!payloadD) {
    return res.status(400).json({ err: "Empty data sent!" });
  }
  const { channelN, handle, u_name } = payloadD;
  if (!channelN || !handle || !u_name) {
    return res.status(400).json({ err: "Invalid data!" });
  }
  try {
    const dbObj = await channelM.create({
      channelName: channelN.trim(),
      handle: handle.trim(),
      u_name: u_name.trim(),
    });
    return res.status(201).json(dbObj);
  } catch (error) {
    console.error("Failed to create channel:", error);
    if (error?.code === 11000) {
      return res.status(409).json({ err: "That handle is already in use." });
    }
    return res
      .status(500)
      .json({ err: "Unable to create channel. Try again." });
  }
});

/*Video Management APIs*/
//creating RESTAPI to fetch data from database..
app.get("/", async (req, res) => {
  const videoArr = await Video.find({});
  if (!videoArr) {
    return res.status(404).json({ msg: "Something went wrong!" });
  }
  res.send(videoArr);
});

//creating RESTAPI to update video details..
app.put("/channel", async (req, res) => {
  try {
    const payload = req.body;

    if (!payload) {
      return res.status(400).json({ msg: "Data is empty!" });
    }

    const { title, desc, imgUrl, videoId } = payload;
    if (!title || !desc || !imgUrl || !videoId) {
      return res.status(400).json({ msg: "Invalid data sent!" });
    }

    const updatedVidObj = await Video.findOneAndUpdate(
      { _id: videoId },
      {
        $set: {
          title,
          description: desc,
          thumbnailUrl: imgUrl,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedVidObj) {
      return res.status(404).json({ msg: "Video not found!" });
    }
    res.status(201).json({
      msg: "Successfully updated video details..",
      updatedObj: updatedVidObj,
    });
  } catch (err) {
    console.log("Something went wrong. Check server! ", err.message);
  }
});

//creating RESTAPI to delete video..
app.delete("/channel", async (req, res) => {
  try {
    const { videoId } = req.body;
    if (!videoId) {
      return res.status(400).json({ msg: "vidID Undefined.." });
    }
    const dbObj = await Video.deleteOne({ videoId });
    if (dbObj.deleteCount === 0) {
      return res.status(404).json({ msg: "Something went wrong!" });
    }
    res.status(200).json({ msg: "video deleted successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Server error!" });
  }
});

app.listen(port, () => {
  console.log("server is running on port: 3200");
});
