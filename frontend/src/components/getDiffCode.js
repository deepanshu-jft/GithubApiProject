async function exp(sha, filename) {
  try {
    let originalApi = await fetch('https://raw.githubusercontent.com/Deepanshu-Kaushik/blog-preview-card/2868f47e6bd0535ec60c6750e6a3bd729a23062f^/README.md')
    let changedApi = await fetch(`https://raw.githubusercontent.com/Deepanshu-Kaushik/blog-preview-card/2868f47e6bd0535ec60c6750e6a3bd729a23062f/README.md`);
    if (!originalApi.ok || !changedApi.ok) throw new Error('error');
    let originalCode = await originalApi;
    let changedCode = await changedApi;
  } catch (error) {
    console.error('error: ', error.message);
  }
}

export default async function (sha, filename) {
  let codeDiff = await exp(sha, filename);
  return filename;
}