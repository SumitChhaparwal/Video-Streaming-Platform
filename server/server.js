import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { users } from "./models/app.model.js";
import bcrypt from "bcrypt";

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

//using built in middleware to access json
app.use(express.json());

//creating reusable authentication middleware func to verify token
const authenticateUser = (req, res, next) => {
  //accessing authentication header
  const authHeader = req.headers.authorization;

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

//creating RESTAPIs to SignUp using post method..
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


//creating RESTAPIs to SignIn using post method..
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


app.listen(port, () => {
  console.log("server is running on port: 3200");
});
