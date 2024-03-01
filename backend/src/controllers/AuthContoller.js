// import express from "express";
import UserService from "../services/authService.js";
import jwt from "jsonwebtoken";

const GITHUB_CLIENT_ID = "b5b76930257d5a9af161";
const GITHUB_CLIENT_SECRET = "fa98cc8b8f24fc0898a7cb5929259ea175b29122";
const JWT_SECRET = "topsecretdonotshare";
const COOKIE_NAME = "github-jwt";

// let accesstoken = null;

const GithubAuthController = {
  async getUserAuth(req, res) {
    console.log("test 1");
    const code = req.query.code;
    const path = req.query.path;

    if (!code) {
      res.status(500).json({ error: "no code in req" });
    }

    const accesstoken = await UserService.getUserToken({ code });
    console.log(accesstoken +' hi1')

    // const userinfo = await UserService.getUser(accesstoken);


    const token = jwt.sign(accesstoken, JWT_SECRET);
    

    res.cookie(COOKIE_NAME, accesstoken, {
      httpOnly: true,
      domain: "localhost",
    });

    // console.log(JSON.stringify(githubuser));
    console.log("test 2");

    res.redirect(`http://localhost:5173${path}`);
  },
  
  async getCookieToken(req, res){
    const cookie = await req.cookies[COOKIE_NAME];
    console.log(cookie);
    res.status(200).send(cookie)
  }
};

export default GithubAuthController;
// export { accesstoken };
