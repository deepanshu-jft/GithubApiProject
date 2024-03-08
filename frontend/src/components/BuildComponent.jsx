import React from "react"
import "../assets/styles/App.css"
import DisplayPageCardComponent from "./DisplayPageCardComponent"

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
      <h1 className="heading flex justify-center mb-12 text-[90px]">
        <span className="welcome">Welcome</span>
        <DisplayPageCardComponent data={data} displayData="name" />
      </h1>
      <div className="container">
        {arr.map((displayData, index) => (
          <div key={displayData} className="card">
            <div className="card-header">
              <div className="text-2xl mb-4 text-[#7a7a8c]">
                {naming(displayData)}
              </div>
              <div className="content break-all">
                <DisplayPageCardComponent
                  data={data}
                  displayData={displayData}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default BuildComponent
