import jwt from "jsonwebtoken";
import GithubAuthController, { accesstoken } from "./AuthContoller.js";
import AuthService from "../services/authService.js";
import RepoService from "../services/repoService.js";
import express from "express";

const JWT_SECRET = "topsecretdonotshare";
const COOKIE_NAME = "github-jwt";

const UserController = {
  getUser(req, res) {
    const cookie = req.cookies[COOKIE_NAME];

    try {
      const decode = jwt.verify(cookie, JWT_SECRET);
      return res.send(decode);
    } catch (e) {
      console.log("wrong jwt secret OR user not found");
      res.send(null);
    }
  },

  async getRepos(req, res) {
    // const cookie = req.cookies[COOKIE_NAME];
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
    const username = req.query.username;
    const reponame = req.query.reponame;

    try {
      const commits = await RepoService.getRepoCommits(username, reponame);
      res.status(200).send(commits);
    } catch (e) {
      console.log("error in user controller getcommit");
      res.send(null);
    }
  },

  async getOldAndNewCode(req, res) {
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
        username,
        reponame,
        commit_sha + "^",
        filename
      );
      const newCode = await RepoService.getCode(
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
