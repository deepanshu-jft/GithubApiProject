import React, { useEffect, useState } from "react"
import { Link, Outlet, useParams } from "react-router-dom"
import getFilename from "../utils/getFilename"
import CommitDifference from "./CommitDifference"
import { RiArrowDropDownLine } from "react-icons/ri"
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri"

function FilenameDashboard() {
  const params = useParams()
  const [filename, setFilename] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [dropdown, setDropdown] = useState(
    new Array(getFilename.length).fill(false)
  )

  const toggleDropdown = (index) => {
    const updatedDropdowns = [...isOpen]
    for (let i = 0; i < updatedDropdowns.length; i++) {
      if (i != index) {
        updatedDropdowns[i] = false
        dropdown[i] = false
      }
    }
    updatedDropdowns[index] = !updatedDropdowns[index]
    dropdown[index] = !dropdown[index]
    setIsOpen(updatedDropdowns)
    setDropdown(dropdown)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filename = await getFilename(
          params.userName,
          params.repoName,
          params.commitSha
        )
        setFilename(filename)
        if (filename) setIsOpen(filename.map(() => false))
      } catch (error) {
        console.error("Error fetching filename:", error)
      }
    }
    fetchData()
  }, [params.userName, params.repoName, params.commitSha])

  return (
    <>
      {!filename ? (
        <h1 className="bg-red-500 text-center">No Files Yet!</h1>
      ) : (
        <div className="flex">
          <div className="repo-list w-full flex flex-col select-none">
            {filename.map((element, index) => (
              <div key={index}>
                <Link
                  key={element.sha}
                  className={`px-12 hover:bg-[#2e2b35] flex justify-between items-center h-8 text-wrap cursor-pointerdropdown-btn ${
                    isOpen[index] ? "open" : ""
                  }`}
                  to={`/${params.userName}/dashboard/${params.repoName}/${params.commitSha}/${element.filename}`}
                  onClick={() => toggleDropdown(index)}
                >
                  {element.filename}
                  <RiArrowDropDownLine className="text-2xl" />
                </Link>

                {isOpen[index] && <Outlet />}
              </div>
            ))}
          </div>
          {/* <Outlet /> */}
        </div>
      )}
    </>
  )
}

export default FilenameDashboard
