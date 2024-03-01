import React, { useEffect, useState } from "react"
import ReactDiffViewer from "react-diff-viewer"
import getDiffCode from "../utils/getDiffCode"

function CommitDifference() {
  const [oldnewcode, setOldnewcode] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const oldnewcode = await getDiffCode("sadad")
        setOldnewcode(oldnewcode)
        console.log(oldnewcode.oldcode) // TEMP CODE
        console.log(oldnewcode.newcode) // TEMP CODE
      } catch (error) {
        console.error("Error fetching oldnewcode:", error)
      }
    }
    fetchData()
  }, ["params.userName, params.repoName"])

  return (
    <>
      {!oldnewcode ? (
        <h1>hi</h1>
      ) : (
        <ReactDiffViewer
          oldValue={atob(oldnewcode.oldcode)}
          newValue={atob(oldnewcode.newcode)}
          splitView={true}
          disableWordDiff={true}
        />
      )}
    </>
  )
}

export default CommitDifference
