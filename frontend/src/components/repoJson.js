async function fetchData() {
  try {
    let api = await fetch('https://api.github.com/users/Deepanshu-Kaushik/repos');
    if (!api.ok) throw new Error('error');
    let data = await api.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export default await fetchData();