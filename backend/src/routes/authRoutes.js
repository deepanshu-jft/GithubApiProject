import express from "express";
import GithubAuthController from "../controllers/AuthContoller.js";

const router = express.Router();

router.get("/github", GithubAuthController.getUserAuth);

router.get("/github/token", GithubAuthController.getCookieToken);

export default router;
