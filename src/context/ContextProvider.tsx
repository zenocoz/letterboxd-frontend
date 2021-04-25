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
    watching: false,
  })

  //make film clubs accessible to many components
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
