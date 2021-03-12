import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Route } from "react-router-dom"
import Backoffice from "./pages/Backoffice/Backoffice"
import NavBar from "./components/NavBar/NavBar"
import { API } from "./API"

function App() {
  useEffect(() => {
    const getMovie = async () => {
      await API.getMoviesByTitle("alien")
    }

    const movie = getMovie()
    console.log(movie)
  })

  return (
    <div className="App">
      <NavBar />
      <Route path="/backoffice">
        {" "}
        <Backoffice />{" "}
      </Route>
    </div>
  )
}

export default App
