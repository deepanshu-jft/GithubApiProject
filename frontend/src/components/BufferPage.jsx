import axios from "axios"
import React, { useEffect, useState } from "react"
import LoginButton from "./LoginButton"
import BuildComponent from "./BuildComponent"
import { Link } from "react-router-dom"
import githubIcon from "../assets/images/github.png"

const GITHUB_CLIENT_ID = "b5b76930257d5a9af161"
const gitHubRedirectURL = "http://localhost:4000/api/auth/github"
const path = "/"
const GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`

function BufferPage() {
  const [token, setToken] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    ;(async function () {
      const tkn = await axios
        .get(`http://localhost:4000/api/auth/github/token`, {
          withCredentials: true, //for cookie
        })
        .then((res) => res.data)
      setToken(tkn)

      const usr = await axios
        .get(`http://localhost:4000/api/user`, {
          withCredentials: true, //for cookie
        })
        .then((res) => res.data)
      setUser(usr)
    })()
  }, [])

  return (
    <>
      {!token || !user ? ( //ye error tha
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
          <BuildComponent data={user} />
          <Link to={`/${user.login}/dashboard`}>
            <button className="repo-dashboard">Repository Dashboard</button>
          </Link>
        </>
      )}
    </>
  )
}

export default BufferPage
