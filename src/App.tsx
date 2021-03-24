import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Route } from "react-router-dom"
import NavBar from "./components/NavBar/NavBar"

import { Container } from "react-bootstrap"
import SignUp from "./pages/SignUp/SignUp"
import Footer from "./components/Footer/Footer"

function App() {
  return (
    <div className="app">
      <Container>
        <NavBar />
        <Route path="/" exact render={(props) => <SignUp />}></Route>

        <Route path="/backoffice"> </Route>
        <Footer />
      </Container>
    </div>
  )
}

export default App
