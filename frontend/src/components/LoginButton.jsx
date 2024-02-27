import React from "react"

function LoginButton({ whichSite, whichColor, whichLogo, href }) {
  return (
    <>
      <div className="login-button" style={{ backgroundColor: { whichColor } }}>
        <img src={whichLogo} />
        <a href={href}>Login with {whichSite}</a>
      </div>
    </>
  )
}

export default LoginButton
