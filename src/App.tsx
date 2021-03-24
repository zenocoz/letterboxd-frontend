import React, { useContext, useState, useEffect, useMemo } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Route } from "react-router-dom"
import NavBar from "./components/NavBar/NavBar"
import { Container } from "react-bootstrap"
import Landing from "./pages/Landing/Landing"
import Home from "./pages/Home/Home"
import Footer from "./components/Footer/Footer"

import { UserContext } from "./context"

function App() {
  const [user, setUser] = useState(null)

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <div className="app">
      <Container>
        <UserContext.Provider value={providerValue}>
          <NavBar />
          <Route path="/" exact render={(props) => <Landing />}></Route>

          <Route path="/home" exact render={(props) => <Home />}></Route>
        </UserContext.Provider>

        <Footer />
      </Container>
    </div>
  )
}

export default App
