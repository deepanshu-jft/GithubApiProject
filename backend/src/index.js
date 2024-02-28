import express, { json } from "express";
import axios from "axios";
import querystring from "querystring";
// import { error } from "console";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import portConfig from '../../frontend/vite.config.js'

dotenv.config();
const port = portConfig.server.port;

const app = express();

// const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID1;
// const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET1;
// const JWT_SECRET = process.env.JWT_SECRET1;
// const COOKIE_NAME = process.env.COOKIE_NAME1;



const GITHUB_CLIENT_ID = "b5b76930257d5a9af161";
const GITHUB_CLIENT_SECRET = "fa98cc8b8f24fc0898a7cb5929259ea175b29122";
const JWT_SECRET = "topsecretdonotshare";
const COOKIE_NAME = "github-jwt";

//Add interface while implementing typescript

app.use(cookieParser());

app.use(
  cors({
    origin: `http://localhost:${port}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

// takes the code generated after authentication and fetch user record
async function getUser({ code }) {
  const userToken = await axios
    .post(
      `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`
    )
    .then((res) => res.data)

    .catch((error) => {
      throw error;
    });

  const decoded = querystring.parse(userToken);
  const accesstoken = decoded.access_token;
  return axios
    .get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accesstoken}` },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("error1");
      console.error("error in fetching user");
      throw error;
    });
}

//GET github records for a user
app.get("/api/auth/github", async (req, res) => {
  console.log("test 1");
  const code = req.query.code;
  const path = req.query.path;

  if (!code) {
    res.status(500).json({ error: "no code in req" });
  }

  const githubuser = await getUser({ code });

  const token = jwt.sign(githubuser, JWT_SECRET);

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    domain: "localhost",
  });

  // console.log(JSON.stringify(githubuser));
  console.log("test 2");

  res.redirect(`http://localhost:${port}${path}`);
});

//GET reading cookies and decoding JWT with secret
app.get("/api/user", (req, res) => {
  const cookie = req.cookies[COOKIE_NAME];

  try {
    const decode = jwt.verify(cookie, JWT_SECRET);
    return res.send(decode);
  } catch (e) {
    console.log("wrong jwt secret");
    res.send(null);
  }
});

app.listen(4000, () => {
  console.log("server running on 4000");
  console.log("frontend running on ", port)
});