import React, { useState, useMemo } from "react"
import { IModal } from "./interface"

import { UserContext } from "."

const ContextProvider: React.FC = ({ children }) => {
  //account modals state
  const [createAccount, setCreateAccount] = useState(false)
  const [signIn, setSignIn] = useState(false)

  //film club state

  //create film club
  const [filmClubData, setFilmClubData] = useState({
    name: "",
    members: [],
    films: [],
    watching: false,
  })

  //film clubs
  const [_filmClubs, _setFilmClubs] = useState([])

  const [currentFilmClub, setCurrentFilmClub] = useState<string>("")

  const _filmClubsContext = useMemo(() => ({ _filmClubs, _setFilmClubs }), [
    _filmClubs,
    _setFilmClubs,
  ])

  const filmClubContext = useMemo(() => ({ filmClubData, setFilmClubData }), [
    filmClubData,
    setFilmClubData,
  ])

  const currentFilmClubContext = useMemo(
    () => ({ currentFilmClub, setCurrentFilmClub }),
    [currentFilmClub, setCurrentFilmClub]
  )

  const providerModals: IModal = {
    accountModal: { createAccount, setCreateAccount },
    signInModal: { signIn, setSignIn },
  }

  const context = {
    providerModals,
    filmClubContext,
    _filmClubsContext,
    currentFilmClubContext,
  }
  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}
export default ContextProvider
