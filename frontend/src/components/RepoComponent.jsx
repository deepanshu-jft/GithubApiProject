import React from "react"
import { useParams } from "react-router-dom"

function RepoComponent() {
  let params = useParams()
  console.log(params)
  return <div>RepoComponent {params.repoId}</div>
}

export default RepoComponent
