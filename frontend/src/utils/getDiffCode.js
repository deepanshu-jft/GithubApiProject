import axios from "axios";

async function fetchData(values) {
  try {
    const params = {
      username: values.userName,
      reponame: values.repoName,
      commitsha: values.commitSha,
      filename: values.fileName,
    }
    let api = await axios.get('http://localhost:4000/api/user/repos/commits/codes',
    {
      withCredentials: true,
      params: params
    });
    return api.data
  } catch (error) {
    console.error('error: ', error.message);
  }
}

export default async function (values) {
  let oldnewcode = await fetchData(values);
  return oldnewcode;
}