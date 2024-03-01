import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function FilenameComponent() {
  const params = useParams()
  const [filenames, setFilenames] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filenames = await commitJSON(params.userName, params.repoName)
        setFilenames(filenames)
        console.log(filenames)
      } catch (error) {
        console.error("Error fetching filenames:", error)
      }
    }

    fetchData()
  }, [params.userName, params.repoName])

  return <div>FilenameComponent</div>
}

export default FilenameComponent
