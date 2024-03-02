import axios from "axios"

async function fetchData(userName, repoName, commitSha) {
  try {
    const params = {
      username: userName,
      reponame: repoName,
      commitsha: commitSha,
    }
    let api = await axios.get(
      "http://localhost:4000/api/user/repos/commits/sha",
      {
        withCredentials: true,
        params: params,
      }
    )
    return api.data.files
  } catch (error) {
    console.error("error: ", error.message)
  }
}

export default async function (userName, repoName, commitSha) {
  let filename = await fetchData(userName, repoName, commitSha)
  return filename
}
