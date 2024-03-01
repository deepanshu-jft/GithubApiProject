async function exp(shaa) {
  // const sha = '7456c15a76fa0ef7929cc7296ab9d9535585ede0';
  try {
    const params = {
      username: 'Deepanshu-Kaushik',
      reponame: 'blog-preview-card',
      filename: 'index.html',
      sha: '7456c15a76fa0ef7929cc7296ab9d9535585ede0',
    }
    // let api = await fetch(`https://api.github.com/repos/Deepanshu-Kaushik/blog-preview-card/commits/${sha}`);
    let api = await fetch('http://localhost:4000/api/user/repos/commits/codes');
    if (!api.ok) throw new Error('error');
    let data = await api.json();
    let filename = data['files'][0].filename;
    return filename;
  } catch (error) {
    console.error('error: ', error.message);
  }
}

export default async function (sha) {
  let filename = await exp(sha);
  return filename;
}