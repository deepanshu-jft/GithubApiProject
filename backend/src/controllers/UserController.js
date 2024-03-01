import jwt from "jsonwebtoken";
// import GithubAuthController, { accesstoken } from "./AuthContoller.js";
import AuthService from "../services/authService.js";
import RepoService from "../services/repoService.js";
import express from "express";

const JWT_SECRET = "topsecretdonotshare";
const COOKIE_NAME = "github-jwt";

const UserController = {
  async getUser(req, res) {
    try {
      const cookie = await req.cookies[COOKIE_NAME];
      console.log(cookie + " hi3");
      const accesstoken = await jwt.verify(cookie, JWT_SECRET);
      console.log("hi4 " + accesstoken);
      const user = await AuthService.getUser(accesstoken);
      return res.send(user);
    } catch (e) {
      console.log("wrong jwt secret OR user not found OR hi3");
      res.send(null);
    }
  },

  async getRepos(req, res) {
    // const accesstoken=req.query.accesstoken;
    try {
      const cookie = req.cookies[COOKIE_NAME];
      const accesstoken = jwt.verify(cookie, JWT_SECRET);
      if (accesstoken == null) {
        console.log("accesstoken is null");
      }

      //   const decode = jwt.verify(cookie, JWT_SECRET);
      const repos = await AuthService.getUserRepos(accesstoken);
      res.status(200).send(repos);
    } catch (e) {
      console.log("error in user controller getrepo");
      res.send(null);
    }
  },

  async getCommits(req, res) {
    try {
      const cookie = req.cookies[COOKIE_NAME];
      const accesstoken = jwt.verify(cookie, JWT_SECRET);
      const username = req.query.username;
      const reponame = req.query.reponame;

      const commits = await RepoService.getRepoCommits(
        accesstoken,
        username,
        reponame
      );
      res.status(200).send(commits);
    } catch (e) {
      console.log("error in user controller getcommit");
      res.send(null);
    }
  },

  async getOldAndNewCode(req, res) {
    try {
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
