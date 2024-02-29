import React from "react"
import repoJson from "../utils/repoJson"
import { Link, Outlet } from "react-router-dom"

function RepoDashboard() {
  return (
    <>
      <div className="flex">
        <div className="repo-list min-h-screen w-96 bg-white p-12 flex flex-col gap-4 select-none">
          {repoJson.map((index) => (
            <Link
              key={index.name}
              className="repo-component flex justify-center items-center h-12 bg-black rounded-lg cursor-pointer"
              to={`/dashboard/${index.name}`}
            >
              {index.name}
            </Link>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default RepoDashboard
