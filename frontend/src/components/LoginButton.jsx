import React from "react"

function LoginButton({ whichSite, whichColor, whichLogo, href }) {
  return (
    <>
      <a
        className="flex justify-center items-center p-5 text-white no-underline text-2xl mb-5"
        style={{ backgroundColor: whichColor }}
        href={href}
      >
        <img className="temp w-10 h-10 mr-3 invert" src={whichLogo} />
        <div>Login with {whichSite}</div>
      </a>
    </>
  )
}

export default LoginButton
