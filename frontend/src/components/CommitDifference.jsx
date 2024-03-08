import React, { useEffect, useState } from "react"
import getDiffCode from "../utils/getDiffCode"
import { useParams } from "react-router-dom"
import { withUser } from "./CodeContext"

function CommitDifference({ setCodeDiff }) {
  const params = useParams()
  const [oldnewcode, setOldnewcode] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const oldnewcode = await getDiffCode(params)
        setOldnewcode(oldnewcode)
        setCodeDiff(oldnewcode)
      } catch (error) {
        console.error("Error fetching oldnewcode:", error)
      }
    }
    fetchData()
  }, [params])

  return (
    <>
      {!oldnewcode ? (
        <h1 className="bg-red-500 text-center">Code Difference Unavailable!</h1>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default withUser(CommitDifference)
