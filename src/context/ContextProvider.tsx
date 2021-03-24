import React, { useState } from "react"

import AppContext from "./UserContext"

const ContextProvider = ({ children }: any) => {
  const [example, setExample] = useState("Hello there")
  const context = {
    setExample,
    example,
  }
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
export default ContextProvider
