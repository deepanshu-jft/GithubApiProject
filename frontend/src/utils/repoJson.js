import axios from "axios";

async function fetchData() {
  try {
    let api = await axios.get('http://localhost:4000/api/user/repos', {
      withCredentials: true
    })
    return api.data;
  } 
  catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export default await fetchData();