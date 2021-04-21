import React, { useState, useMemo } from "react"
import { IModal } from "./interface"

import { UserContext } from "."

const ContextProvider: React.FC = ({ children }) => {
  const [createAccount, setCreateAccount] = useState(false)
  const [signIn, setSignIn] = useState(false)
  const [clubMembers, setClubMembers] = useState([])

  // const providerUser = useMemo(() => ({ user, setUser }), [user, setUser])
  // const providerUserId = useMemo(() => ({ userId, setUserId }), [
  //   userId,
  //   setUserId,
  // ])

  const clubMembersContext = useMemo(() => ({ clubMembers, setClubMembers }), [
    clubMembers,
    setClubMembers,
  ])

  // const filmClubProvider = useMemo(() => ({ filmClubData, setFilmClubData }), [
  //   filmClubData,
  //   setFilmClubData,
  // ])

  const providerModals: IModal = {
    accountModal: { createAccount, setCreateAccount },
    signInModal: { signIn, setSignIn },
  }

  const context = {
    providerModals,
    clubMembersContext,
  }
  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}
export default ContextProvider
