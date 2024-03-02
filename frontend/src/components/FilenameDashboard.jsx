import React, { useEffect, useState } from "react"
import { Link, Outlet, useParams } from "react-router-dom"
import getFilename from "../utils/getFilename"

function FilenameDashboard() {
  const params = useParams()
  const [filename, setFilename] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filename = await getFilename(
          params.userName,
          params.repoName,
          params.commitSha
        )
        setFilename(filename)
      } catch (error) {
        console.error("Error fetching filename:", error)
      }
    }
    fetchData()
  }, [params.userName, params.repoName, params.commitSha])

  return (
    <>
      {!filename ? (
        <h1>hi</h1>
      ) : (
        <div className="flex">
          <div className="repo-list min-h-screen w-96 bg-white p-12 flex flex-col gap-4 select-none">
            {filename.map((index) => (
              <Link
                key={index.sha}
                className="repo-component flex justify-center items-center h-12 bg-black rounded-lg cursor-pointer"
                to={`/${params.userName}/dashboard/${params.repoName}/${params.commitSha}/${index.filename}`}
              >
                {index.filename}
              </Link>
            ))}
          </div>
          <Outlet />
        </div>
      )}
    </>
  )
}

export default FilenameDashboard
