import axios from "axios"

async function fetchData(userName, repoName) {
  try {
    const params = {
      username: userName,
      reponame: repoName,
    }
    let api = await axios.get("http://localhost:4000/api/user/repos/commits", {
      withCredentials: true,
      params: params,
    })
    return api.data
  } catch (error) {
    console.error("Error: ", error.message)
  }
}

export default async function (userName, repoName) {
  let commitList = await fetchData(userName, repoName)
  return commitList
}
