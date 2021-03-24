import React, { useState, useMemo } from "react"

import { UserContext } from "."

const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(null)

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser])

  // const [example, setExample] = useState("Hello there")
  // const context = {
  //   setExample,
  //   example,
  // }
  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  )
}
export default ContextProvider
