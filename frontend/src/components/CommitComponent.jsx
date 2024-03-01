import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import GetFileName from "../utils/getFilename"
import GetCodeDiff from "../utils/getDiffCode"
import CommitDifference from "./CommitDifference"

function CommitComponent() {
  const params = useParams()
  const [filename, setFilename] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filename = await GetFileName(params.commitId)
        setFilename(filename)
        const codeDiff = await GetCodeDiff(params.commitId, filename)
      } catch (error) {
        console.error("Error fetching filename:", error)
      }
    }

    fetchData()
  }, [params.commitId])

  return (
    <div className="p-12 w-96 text-black">
      <CommitDifference />
    </div>
  )
}

export default CommitComponent
