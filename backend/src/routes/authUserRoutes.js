import UserController from "../controllers/UserController.js";

import express from "express";

const router = express.Router();

router.get("", UserController.getUser);

router.get("/repos", UserController.getRepos);

router.get("/repos/commits", UserController.getCommits);

router.get("/repos/commits/sha", UserController.getFilename);

router.get("/repos/commits/codes", UserController.getOldAndNewCode);

export default router;
