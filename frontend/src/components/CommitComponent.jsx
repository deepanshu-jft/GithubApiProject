import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import GetFileName from "./getFilename.js"
import GetCodeDiff from "./getDiffCode.js"
import CommitDifference from "./CommitDifference.jsx"

function CommitComponent() {
  const params = useParams()
  const [filename, setFilename] = useState(null)
  const [codeDiff, setCodeDiff] = useState(null)

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
    <div className="p-12 w-96">
      <CommitDifference />
    </div>
  )
}

export default CommitComponent
