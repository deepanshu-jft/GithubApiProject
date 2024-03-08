import React, { createContext, useState } from "react"
const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [CodeDiff, setCodeDiff] = useState()
  return (
    <UserContext.Provider value={{ CodeDiff, setCodeDiff }}>
      {children}
    </UserContext.Provider>
  )
}

const withUser = (Child) => (props) =>
  (
    <UserContext.Consumer>
      {(context) => <Child {...props} {...context} />}
    </UserContext.Consumer>
  )

export { UserProvider, withUser }
