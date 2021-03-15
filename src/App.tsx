import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Route } from "react-router-dom"
import Backoffice from "./pages/Backoffice/Backoffice"
import NavBar from "./components/NavBar/NavBar"
import { API } from "./API"
import { Container } from "react-bootstrap"
import SignUp from "./pages/SignUp/SignUp"
import Footer from "./components/Footer/Footer"

function App() {
  useEffect(() => {
    const getMovie = async () => {
      await API.getMoviesByTitle("alien")
    }

    const movie = getMovie()
    console.log(movie)
  })

  return (
    <div className="app">
      <Container>
        <NavBar />
        <Route path="/">
          <SignUp />
        </Route>

        <Route path="/backoffice">
          {" "}
          <Backoffice />{" "}
        </Route>
        <Footer />
      </Container>
    </div>
  )
}

export default App
