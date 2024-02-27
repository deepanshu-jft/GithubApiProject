import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

const GITHUB_CLIENT_ID = "b5b76930257d5a9af161";
const gitHubRedirectURL = "http://localhost:4000/api/auth/github";
const path = "/";

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    (async function () {
      const usr = await axios
        .get(`http://localhost:4000/api/user`, {
          withCredentials: true,
        })
        .then((res) => res.data);

      setUser(usr);
    })();
  }, []);

  return (
    <div className="App">
      {console.log(user)}
      {!user ? (
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`}
        >
          Login with Github
        </a>
      ) : (
        // <h1>JSON.stringify(user)</h1>
        <h1>Welcome {user.name}</h1>
      )}
    </div>
  );
};

export default App;
