import React from "react"
import { useParams, Link, Outlet } from "react-router-dom"
import commitJSON from "../utils/commitJSON"

function RepoComponent() {
  let params = useParams()
  return (
    <div className="flex">
      <div className="commit-list min-h-screen bg-red-900 w-96 p-12 flex flex-col gap-4 select-none">
        {commitJSON.map((index) => (
          <Link
            key={index.commit.committer.date}
            className="repo-component flex justify-center items-center h-12 bg-black rounded-lg cursor-pointer"
            to={`/dashboard/${params.repoId}/${index.sha}`}
          >
            {index.commit.committer.date}
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  )
}

export default RepoComponent
