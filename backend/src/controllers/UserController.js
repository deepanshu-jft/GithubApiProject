import jwt from "jsonwebtoken";
// import GithubAuthController, { accesstoken } from "./AuthContoller.js";
import AuthService from "../services/authService.js";
import RepoService from "../services/repoService.js";
import express from "express";

const JWT_SECRET = "topsecretdonotshare";
const COOKIE_NAME = "github-jwt";

const UserController = {
  async getUser(req, res) {
    const cookie = req.cookies[COOKIE_NAME];
    const accesstoken = jwt.verify(cookie, JWT_SECRET);

    try {
      
      const user= await AuthService.getUser(accesstoken);
      return res.send(user);
    } catch (e) {
      console.log("wrong jwt secret OR user not found");
      res.send(null);
    }
  },

  async getRepos(req, res) {
    // const accesstoken=req.query.accesstoken;
    const cookie = req.cookies[COOKIE_NAME];
    const accesstoken = jwt.verify(cookie, JWT_SECRET);
    if (accesstoken == null) {
      console.log("accesstoken is null");
    }
    try {
      //   const decode = jwt.verify(cookie, JWT_SECRET);
      const repos = await AuthService.getUserRepos(accesstoken);
      res.status(200).send(repos);
    } catch (e) {
      console.log("error in user controller getrepo");
      res.send(null);
    }
  },

  async getCommits(req, res) {
    const cookie = req.cookies[COOKIE_NAME];
    const accesstoken = jwt.verify(cookie, JWT_SECRET);
    const username = req.query.username;
    const reponame = req.query.reponame;

    try {
      const commits = await RepoService.getRepoCommits(accesstoken, username, reponame);
      res.status(200).send(commits);
    } catch (e) {
      console.log("error in user controller getcommit");
      res.send(null);
    }
  },

  async getOldAndNewCode(req, res) {
    const cookie = req.cookies[COOKIE_NAME];
    const accesstoken = jwt.verify(cookie, JWT_SECRET);
    // console.log("yoyo");
    // console.log(req.query);
    // res.status(201).send("hi");

    const username = req.query.username;
    const commit_sha = req.query.commitsha;
    const filename = req.query.filename;
    const reponame = req.query.reponame;

    // console.log(username + "  hi 1");

    try {
      const oldcode = await RepoService.fetchFileContent(
        accesstoken,
        username,
        reponame,
        commit_sha + "^",
        filename
      );
      const newCode = await RepoService.fetchFileContent(
        accesstoken,
        username,
        reponame,
        commit_sha,
        filename
      );

      const OldNewCode = {
        oldcode: null,
        newcode: null,
      };
      OldNewCode.oldcode = oldcode;
      OldNewCode.newcode = newCode;

      res.status(200).send(OldNewCode);
    } catch (e) {
      console.log("error in user contrl old new code");
      res.send(null);
    }
  },
};

export default UserController;
