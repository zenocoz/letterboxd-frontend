import React, { useState, useMemo } from "react"
import { IModal } from "./interface"

import { UserContext } from "."

//ANY
const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(null)
  const [createAccount, setCreateAccount] = useState(false)
  const [signIn, setSignIn] = useState(false)

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser])

  const providerModals: any = {
    accountModal: { createAccount, setCreateAccount },
    signInModal: { signIn, setSignIn },
  }

  const context = {
    providerValue,
    providerModals,
  }
  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}
export default ContextProvider
