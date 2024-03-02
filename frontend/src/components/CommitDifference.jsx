import React, { useEffect, useState } from "react"
import ReactDiffViewer from "react-diff-viewer"
import getDiffCode from "../utils/getDiffCode"
import { useParams } from "react-router-dom"

function CommitDifference() {
  const params = useParams();
  const [oldnewcode, setOldnewcode] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const oldnewcode = await getDiffCode(params)
        setOldnewcode(oldnewcode)
      } catch (error) {
        console.error("Error fetching oldnewcode:", error)
      }
    }
    fetchData()
  }, [params])

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
