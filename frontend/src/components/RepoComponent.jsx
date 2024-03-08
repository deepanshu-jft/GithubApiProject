import React, { useEffect, useState } from "react"
import { useParams, Link, Outlet } from "react-router-dom"
import commitJSON from "../utils/commitJSON"

function RepoComponent() {
  const params = useParams()
  const [commitlist, setCommitlist] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = (index) => {
    const updatedDropdowns = [...isOpen]
    for (let i = 0; i < updatedDropdowns.length; i++) {
      if (i != index) updatedDropdowns[i] = false
    }
    updatedDropdowns[index] = !updatedDropdowns[index]
    setIsOpen(updatedDropdowns)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commitlist = await commitJSON(params.userName, params.repoName)
        setCommitlist(commitlist)
        if (commitlist) setIsOpen(commitlist.map(() => false))
      } catch (error) {
        console.error("Error fetching commitlist:", error)
      }
    }
    fetchData()
  }, [params.userName, params.repoName])

  return (
    <>
      {!commitlist ? (
        <h1 className="bg-red-500 text-center">No Commits Yet!</h1>
      ) : (
        <div className="flex">
          <div className="commit-list w-full flex flex-col select-none">
            {commitlist.map((element, index) => (
              <div key={index}>
                <Link
                  key={element.sha}
                  className={`repo-component hover:bg-[#2e2b35] px-8 flex justify-between items-center min-h-8 py-1 text-wrap break-all w-full cursor-pointer dropdown-btn ${
                    isOpen[index] ? "open" : ""
                  }`}
                  to={`/${params.userName}/dashboard/${params.repoName}/${element.sha}`}
                  onClick={() => toggleDropdown(index)}
                >
                  {element.commit.message}
                </Link>
                {isOpen[index] && <Outlet />}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default RepoComponent
