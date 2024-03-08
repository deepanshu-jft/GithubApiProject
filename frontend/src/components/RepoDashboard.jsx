import React, { useState } from "react"
import { Link, Outlet, useParams } from "react-router-dom"
import repoJson from "../utils/repoJson"

function RepoDashboard() {
  const params = useParams()
  const [isOpen, setIsOpen] = useState(repoJson.map(() => false))

  const toggleDropdown = (index) => {
    const updatedDropdowns = [...isOpen]
    for (let i = 0; i < updatedDropdowns.length; i++) {
      if (i != index) {
        updatedDropdowns[i] = false
      }
    }
    updatedDropdowns[index] = !updatedDropdowns[index]
    setIsOpen(updatedDropdowns)
  }

  return (
    <>
      <div className="flex">
        <div className="repo-list min-w-96 min-h-screen mt-12 flex flex-col select-none border border-gray-700">
          <h1 className="text-center border-b border-gray-700 text-xl py-1">
            Repo List
          </h1>
          {repoJson.map((element, index) => (
            <div key={element.id}>
              <Link
                key={element.id}
                className={`px-4 hover:bg-[#2e2b35] flex justify-between items-center h-10 cursor-pointer dropdown-btn ${
                  isOpen[index] ? "open" : ""
                }`}
                to={`/${params.userName}/dashboard/${element.name}`}
                onClick={() => toggleDropdown(index)}
              >
                {element.name}
              </Link>
              {isOpen[index] && <Outlet />}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default RepoDashboard
