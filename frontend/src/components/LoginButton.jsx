import React from "react"
import "../assets/styles/LoginButton.css"

function LoginButton({ whichSite, whichColor, whichLogo, href }) {
  return (
    <>
      <a
        className="login-button"
        style={{ backgroundColor: whichColor }}
        href={href}
      >
        <img src={whichLogo} />
        <div>Login with {whichSite}</div>
      </a>
    </>
  )
}

export default LoginButton
