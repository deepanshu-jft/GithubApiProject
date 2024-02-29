import axios from "axios";
import querystring from "querystring";



const GITHUB_CLIENT_ID = "b5b76930257d5a9af161";
const GITHUB_CLIENT_SECRET = "fa98cc8b8f24fc0898a7cb5929259ea175b29122";
const JWT_SECRET = "topsecretdonotshare";
const COOKIE_NAME = "github-jwt";

const AuthService = {
  async getUserToken({ code }) {
    const userToken = await axios
      .post(
        `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`
      )
      .then((res) => res.data)

      .catch((error) => {
        // throw error;
        console.log("error");
      });

    const decoded = querystring.parse(userToken);
    const accesstoken = decoded.access_token;
    return accesstoken;
  },

  async getUser(accesstoken) {
    const user = await axios
      .get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${accesstoken}` },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.log("error1");
        // console.error("error in fetching user");
        // throw error;
      });
    return user;
  },

  async getUserRepos(accesstoken) {
    const repos = await axios
      .get(`${process.env.GITHUB_URL}/orgs/anwesh-jft/repos`, {
        headers: { Authorization: `Bearer ${accesstoken}` },
      })
      .then((res) => res.data)
      .catch((e) => {
        console.log("error fetching repos");
        // throw error;
      });
    return repos;
  },

  async getRepoCommit(accesstoken, username, reponame) {
    const repos = await axios
      .get(`https://api.github.com/repos/${username}/${reponame}/commits`, {
        headers: { Authorization: `Bearer ${accesstoken}` },
      })
      .then((res) => res.data)
      .catch((e) => {
        console.log("error fetching repos");
        throw error;
      });
    return repos;
  },
};

export default AuthService;
