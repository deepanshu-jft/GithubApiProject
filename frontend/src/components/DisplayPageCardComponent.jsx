import React from "react"

function DisplayPageCardComponent({ data, displayData }) {
  return (
    <>
        {data[displayData] !== data["created_at"]
          ? data[displayData]
          : data["created_at"].slice(0, 10)}
    </>
  )
}

export default DisplayPageCardComponent