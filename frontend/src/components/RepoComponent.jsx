import React, { useEffect, useState } from "react"
import { useParams, Link, Outlet } from "react-router-dom"
import commitJSON from "../utils/commitJSON"

function RepoComponent() {
  const params = useParams()
  const [commitlist, setCommitlist] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commitlist = await commitJSON(params.userName, params.repoName)
        setCommitlist(commitlist)
      } catch (error) {
        console.error("Error fetching commitlist:", error)
      }
    }
    fetchData()
  }, [params.userName, params.repoName])

  return (
    <>
      {!commitlist ? (
        <h1>No Commits Yet!</h1>
      ) : (
        <div className="flex">
          <div className="commit-list min-h-screen bg-red-900 w-96 p-12 flex flex-col gap-4 select-none">
            {commitlist.map((index) => (
              <Link
                key={index.sha}
                className="repo-component flex justify-center items-center h-12 bg-black rounded-lg cursor-pointer"
                to={`/${params.userName}/dashboard/${params.repoName}/${index.sha}`}
              >
                {index.commit.message}
              </Link>
            ))}
          </div>
          <Outlet />
        </div>
      )}
    </>

    // <div className="flex">
    //   <div className="commit-list min-h-screen bg-red-900 w-96 p-12 flex flex-col gap-4 select-none">
    //     {commitlist.map((index) => (
    //       <Link
    //         key={index.commit.committer.date}
    //         className="repo-component flex justify-center items-center h-12 bg-black rounded-lg cursor-pointer"
    //         to={`/${params.userName}/dashboard/${params.repoName}`}
    //       >
    //         {index.commit.committer.date}
    //       </Link>
    //     ))}
    //   </div>
    //   <Outlet />
    // </div>
  )
}

export default RepoComponent
