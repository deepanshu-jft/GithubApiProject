import dotenv from "dotenv";
dotenv.config();

const secret = process.env.GITHUB_CLIENT_SECRET1;
console.log(secret);
