// async function exp(sha, filename) {
//   try {
//     let originalApi = await fetch('https://raw.githubusercontent.com/Deepanshu-Kaushik/blog-preview-card/2868f47e6bd0535ec60c6750e6a3bd729a23062f^/README.md')
//     let changedApi = await fetch(`https://raw.githubusercontent.com/Deepanshu-Kaushik/blog-preview-card/2868f47e6bd0535ec60c6750e6a3bd729a23062f/README.md`);
//     if (!originalApi.ok || !changedApi.ok) throw new Error('error');
//     let originalCode = await originalApi;
//     let changedCode = await changedApi;
//   } catch (error) {
//     console.error('error: ', error.message);
//   }
// }


// export default async function (sha, filename) {
//   let codeDiff = await exp(sha, filename);
//   return filename;
// }

import axios from "axios";

async function exp(shaa) {
  // const sha = '7456c15a76fa0ef7929cc7296ab9d9535585ede0';
  try {
    const params = {
      username: 'Deepanshu-Kaushik',
      reponame: 'blog-preview-card',
      filename: 'index.html',
      commitsha: '7456c15a76fa0ef7929cc7296ab9d9535585ede0',
    }
    // let api = await fetch(`https://api.github.com/repos/Deepanshu-Kaushik/blog-preview-card/commits/${sha}`);
    let api = await axios.get('http://localhost:4000/api/user/repos/commits/codes',
      {
        withCredentials: true,
        params: params
      });
    console.log(api.data)
    return api.data
    // if (!api.ok) throw new Error('error');
    // let data = await api.json();
    // let filename = data['files'][0].filename;
    // return filename;
  } catch (error) {
    console.error('error: ', error.message);
  }
}

export default async function (sha) {
  let filename = await exp(sha);
  return filename;
}