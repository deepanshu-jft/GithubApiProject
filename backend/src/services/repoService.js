import axios from "axios";
import querystring from "querystring";

const GITHUB_CLIENT_ID = "b5b76930257d5a9af161";
const GITHUB_CLIENT_SECRET = "fa98cc8b8f24fc0898a7cb5929259ea175b29122";
const JWT_SECRET = "topsecretdonotshare";
const COOKIE_NAME = "github-jwt";

const RepoService = {
  async getUserRepos(accesstoken) {
    const repos = await axios
      .get("https://api.github.com/user/repos", {
        headers: { Authorization: `Bearer ${accesstoken}` },
      })
      .then((res) => res.data)
      .catch((e) => {
        console.log("error fetching repos");
        // throw error;
      });
    return repos;
  },

  async getRepoCommits(accesstoken, username, reponame) {
    const commits = await axios
      .get(`https://api.github.com/repos/${username}/${reponame}/commits`, {
        headers: { Authorization: `Bearer ${accesstoken}` },
      })
      .then((res) => res.data)
      .catch((e) => {
        console.log("error in service . getreposcommit");
        // throw error;
      });
    return commits;
  },

  async getFilename(accesstoken, username, reponame, commit_sha) {
    const filename = await axios
      .get(`https://api.github.com/repos/${username}/${reponame}/commits/${commit_sha}`, {
        headers: { Authorization: `Bearer ${accesstoken}` },
      })
      .then((res) => res.data)
      .catch((e) => {
        console.log("error in service . getfilename");
        // throw error;
      });
    return filename;
  },

  async getCode(accesstoken, username, reponame, commit_sha, filename) {
    // console.log(username);
    const code = await axios
      .get(
        `https://raw.githubusercontent.com/${username}/${reponame}/${commit_sha}/${filename}`,
        {
          headers: { Authorization: `Bearer ${accesstoken}` },
        }
      )
      .then((res) => res.data)
      .catch((e) => {
        console.log("error in service . getCode");
      });
    return code;
  },

  async fetchFileContent(accesstoken, owner, repo, commitSha, filePath) {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
        {
          params: {
            ref: commitSha,
          },
          headers: { Authorization: `Bearer ${accesstoken}` },
        }
      );
      // console.log(response.data)
      return response.data.content;
    } catch (error) {
      console.error(
        `Error fetching file content for ${owner}/${repo}/${filePath} at commit ${commitSha}:`,
        error.message
      );
      return null;
    }
  },
};

export default RepoService;
