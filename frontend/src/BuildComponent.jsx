import React from "react"
import Component from "./Component"
import "./App.css"

function naming(string) {
  let newArr = string.split("_")
  string = ""
  newArr.forEach((element) => {
    element = element[0].toUpperCase() + element.slice(1)
    string += " " + element
  })
  return string
}

function BuildComponent({ data }) {
  const arr = [
    "company",
    "location",
    "public_repos",
    "public_gists",
    "followers",
    "following",
    "created_at",
    "url",
  ]

  return (
    <>
      <h1 className="heading">
        <span className="welcome">Welcome</span>
        <Component data={data} displayData="name" />
      </h1>
      <div className="container">
        {arr.map((displayData, index) => (
          <div key={displayData} className="card">
            <div className="card-header">
              <div className="title">{naming(displayData)}</div>
              <div className="content">
                <Component data={data} displayData={displayData} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default BuildComponent
