import React from "react"
import { Link, Outlet, useParams } from "react-router-dom"
import repoJson from "../utils/repoJson"

function RepoDashboard() {
  const params = useParams()
  return (
    <>
      <div className="flex">
        <div className="repo-list min-h-screen w-96 bg-white p-12 flex flex-col gap-4 select-none">
          {repoJson.map((index) => (
            <Link
              key={index.name}
              className="repo-component flex justify-center items-center h-12 bg-black rounded-lg cursor-pointer"
              to={`/${params.userName}/dashboard/${index.name}`}
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
