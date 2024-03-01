// anwesh hi1

import axios from "axios"
import "./assets/styles/App.css"
import { useState, useEffect } from "react"
import BuildComponent from "./components/BuildComponent"
import LoginButton from "./components/LoginButton"
import githubIcon from "./assets/images/github.png"
import { Link } from "react-router-dom"

const GITHUB_CLIENT_ID = "b5b76930257d5a9af161"
const gitHubRedirectURL = "http://localhost:4000/api/auth/github"
const path = "/"
const GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`




const App = () => {
  const [token, setToken] = useState()
  const [user, setUser] =useState()
  
  useEffect(() => {
    (async function () {
      const params = {
        username: "Deepanshu-Kaushik",
        filename: "index.html",
        reponame: "blog-preview-card",
        commitsha: "7456c15a76fa0ef7929cc7296ab9d9535585ede^",
      };
      
      const tkn = await axios
        .get(`http://localhost:4000/api/auth/github/token`, {
          withCredentials: true, //for cookie
        })
        .then((res) => res.data)
      setToken(tkn)

      const usr = await axios
        .get(`http://localhost:4000/api/user/repos/commits/sha`, {
          withCredentials: true, //for cookie
          params: params,
        })
        .then((res) => res.data)
      setUser(usr)


    })()
  }, [])

  return (
    <div className="App">
      {(!token || !user)? (                               //ye error tha
        <div className="display-content">
          <div className="login-card">
            <h2>Authenticate With</h2>
            <LoginButton
              whichSite="GitHub"
              whichColor="black"
              whichLogo={githubIcon}
              href={GITHUB_URL}
            />
          </div>
        </div>
      ) : (
        <>
          {/* <BuildComponent data={user} /> */}
          {console.log(user)}
          <h1>hi</h1>
          {/* <Link to="/dashboard">
            <button className="repo-dashboard">Repository Dashboard</button>
          </Link> */}
        </>
      )}
    </div>
  )
}

export default App;
