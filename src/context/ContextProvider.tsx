import React, { useState } from "react"

import { UserContext } from "."

const ContextProvider = ({ children }: any) => {
  const [example, setExample] = useState("Hello there")
  const context = {
    setExample,
    example,
  }
  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}
export default ContextProvider
