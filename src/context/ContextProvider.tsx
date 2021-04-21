import React, { useState, useMemo } from "react"
import { IModal } from "./interface"

import { UserContext } from "."

const ContextProvider: React.FC = ({ children }) => {
  const [createAccount, setCreateAccount] = useState(false)
  const [signIn, setSignIn] = useState(false)
  const [filmClubData, setFilmClubData] = useState({
    name: "",
    members: [],
    films: [],
  })

  const filmClubContext = useMemo(() => ({ filmClubData, setFilmClubData }), [
    filmClubData,
    setFilmClubData,
  ])

  const providerModals: IModal = {
    accountModal: { createAccount, setCreateAccount },
    signInModal: { signIn, setSignIn },
  }

  const context = {
    providerModals,
    filmClubContext,
  }
  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}
export default ContextProvider
