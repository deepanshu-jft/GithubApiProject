async function fetchData() {
  try {
    let api = await fetch('https://api.github.com/repos/Deepanshu-Kaushik/blog-preview-card/commits');
    if (!api.ok) throw new Error('error');
    let data = await api.json();
    return data;
  } catch (error) {
    console.error('Error: ', error.message)
  }
}

export default await fetchData();