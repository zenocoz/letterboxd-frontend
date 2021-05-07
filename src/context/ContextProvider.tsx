import React, { useState, useMemo } from "react"
import { IModal } from "./interface"

import { UserContext } from "."

const ContextProvider: React.FC = ({ children }) => {
  //STATE
  //modals
  const [createAccount, setCreateAccount] = useState(false)
  const [signIn, setSignIn] = useState(false)

  //film club
  const [filmClubData, setFilmClubData] = useState({
    name: "",
    members: [],
    films: [],
    watching: false,
    errorMsg: "",
  })
  const [_filmClubs, _setFilmClubs] = useState([])
  const [currentFilmClub, setCurrentFilmClub] = useState<string>("")

  //CONTEXTS
  const providerModals: IModal = {
    accountModal: { createAccount, setCreateAccount },
    signInModal: { signIn, setSignIn },
  }

  const filmClubContext = useMemo(() => ({ filmClubData, setFilmClubData }), [
    filmClubData,
    setFilmClubData,
  ])
  const _filmClubsContext = useMemo(() => ({ _filmClubs, _setFilmClubs }), [
    _filmClubs,
    _setFilmClubs,
  ])
  const currentFilmClubContext = useMemo(
    () => ({ currentFilmClub, setCurrentFilmClub }),
    [currentFilmClub, setCurrentFilmClub]
  )

  const context = {
    providerModals,
    filmClubContext,
    _filmClubsContext,
    currentFilmClubContext,
  }
  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}
export default ContextProvider
