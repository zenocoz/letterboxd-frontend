import React, { useState, useMemo } from "react"
import { IModal } from "./interface"

import { UserContext } from "."

const ContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState(null)

  const [createAccount, setCreateAccount] = useState(false)
  const [signIn, setSignIn] = useState(false)

  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser])
  const providerUserId = useMemo(() => ({ userId, setUserId }), [
    userId,
    setUserId,
  ])

  const providerModals: IModal = {
    accountModal: { createAccount, setCreateAccount },
    signInModal: { signIn, setSignIn },
  }

  const context = {
    providerUser,
    providerModals,
    providerUserId,
  }
  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}
export default ContextProvider
