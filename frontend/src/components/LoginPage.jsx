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

function LoginPage() {
  const [token, setToken] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    ;(async function () {
      const tkn = await axios.get(
        `http://localhost:4000/api/auth/github/token`,
        {
          withCredentials: true, //for cookie
        }
      )
      const token = tkn.data
      setToken(token)

      const usr = await axios.get(`http://localhost:4000/api/user`, {
        withCredentials: true, //for cookie
      })
      const user = usr.data
      setUser(user)
    })()
  }, [])

  return (
    <>
      {!token || !user ? ( //ye error tha
        <div className="h-screen flex justify-center items-center">
          <div className="login-card w-[500px] h-[500px] bg-white rounded-3xl flex flex-col items-center">
            <h2 className="my-24 text-black text-4xl">Authenticate With</h2>
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
          <div className="flex justify-center mt-12">
            <Link to={`/${user.login}/dashboard`}>
              <button className="p-2 text-4xl cursor-pointer bg-white text-black hover:bg-black hover:text-white">
                Repository Dashboard
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  )
}

export default LoginPage
