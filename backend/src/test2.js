import axios from "axios";

async function getUserToken({ code }) {
  const userToken = await axios
    .post(
      `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`
    )
    .then((res) => res.data)

    .catch((error) => {
      throw error;
    });

  const decoded = querystring.parse(userToken);
  const accesstoken = decoded.access_token;
  return accesstoken;
}

async function getUser(accesstoken) {
  const user = await axios
    .get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accesstoken}` },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("error1");
      console.error("error in fetching user");
      throw error;
    });
  return user;
}

async function getUserRepos(accesstoken) {
  const repos = await axios
    .get("https://api.github.com/user/repos", {
      headers: { Authorization: `Bearer ${accesstoken}` },
    })
    .then((res) => res.data)
    .catch((e) => {
      console.log("error fetching repos");
      throw error;
    });
  return repos;
}

async function getRepoCommit(accesstoken, username, reponame) {
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
  }

  
  

