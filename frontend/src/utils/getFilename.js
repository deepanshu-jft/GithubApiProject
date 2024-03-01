import axios from "axios";

async function exp(shaa) {
  try {
    const params = {
      username: 'Deepanshu-Kaushik',
      reponame: 'blog-preview-card',
      commitsha: '7456c15a76fa0ef7929cc7296ab9d9535585ede0',
    }
    let api = await axios.get('http://localhost:4000/api/user/repos/commits/sha',
    {
      withCredentials: true,
      params: params
    });
    return api.data
  } catch (error) {
    console.error('error: ', error.message);
  }
}

export default async function (sha) {
  let filename = await exp(sha);
  return filename;
}