async function exp(sha) {
  try {
    let api = await fetch(`https://api.github.com/repos/Deepanshu-Kaushik/blog-preview-card/commits/${sha}`);
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