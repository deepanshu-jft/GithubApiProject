import axios from "axios"
import "./assets/styles/App.css"
import { useState, useEffect } from "react"
import BuildComponent from "./components/BuildComponent"
import LoginButton from "./components/LoginButton"

const GITHUB_CLIENT_ID = "b5b76930257d5a9af161"
const gitHubRedirectURL = "http://localhost:4000/api/auth/github"
const path = "/"


const App = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    ;(async function () {
      const usr = await axios
        .get(`http://localhost:4000/api/user`, {
          withCredentials: true,
        })
        .then((res) => res.data)

      setUser(usr)
    })()
  }, [])

  return (
    <div className="App">
      {!user ? (
        // <a
        //   href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`}
        // >
        //   Login with Github
        // </a>
        <div className="login-card">
          <h2>Authenticate With</h2>
          <LoginButton href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`} />
        </div>
      ) : (
        <BuildComponent data={user} />
      )}
    </div>
  )
}

export default App
