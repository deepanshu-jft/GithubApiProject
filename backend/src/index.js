import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

//local imports
import AuthRoutes from "./routes/authRoutes.js";
import UserRoutes from "./routes/authUserRoutes.js";

dotenv.config();

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

//middleware------
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5174",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

//GET github records for a user

app.use("/api/auth", AuthRoutes);

//GET reading cookies and decoding JWT with secret
app.use("/api/user", UserRoutes);

app.listen(4000, () => {
  console.log("server running on 4000");
});
