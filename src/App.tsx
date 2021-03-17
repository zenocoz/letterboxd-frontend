import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Route } from "react-router-dom"
import Backoffice from "./pages/Backoffice/Backoffice"
import NavBar from "./components/NavBar/NavBar"

import { Container } from "react-bootstrap"
import SignUp from "./pages/SignUp/SignUp"
import Footer from "./components/Footer/Footer"

function App() {
  // const [movies, setMovies] = useState([])

  // useEffect(() => {
  //   const retrievedMovies: any = [] //ANY

  //   const movie1: Promise<object> = new Promise((resolve, reject) => {
  //     setTimeout(resolve, 100, API.getMoviesByTitle("barry lyndon"))
  //   })
  //   const movie2: Promise<object> = new Promise((resolve, reject) => {
  //     setTimeout(resolve, 100, API.getMoviesByTitle("apocalypse now"))
  //   })
  //   const movie3: Promise<object> = new Promise((resolve, reject) => {
  //     setTimeout(resolve, 100, API.getMoviesByTitle("mad max"))
  //   })
  //   const movie4: Promise<object> = new Promise((resolve, reject) => {
  //     setTimeout(resolve, 100, API.getMoviesByTitle("body double"))
  //   })
  //   const movie5: Promise<object> = new Promise((resolve, reject) => {
  //     setTimeout(resolve, 100, API.getMoviesByTitle("sorcerer"))
  //   })
  //   const movie6: Promise<object> = new Promise((resolve, reject) => {
  //     setTimeout(resolve, 100, API.getMoviesByTitle("wild at heart"))
  //   })

  //   Promise.all([movie1, movie2, movie3, movie4, movie5, movie6]).then(
  //     (values) => {
  //       retrievedMovies.push(values)
  //     }
  //   )
  //   setMovies(retrievedMovies)
  // }, [])

  return (
    <div className="app">
      <Container>
        <NavBar />
        <Route path="/" exact render={(props) => <SignUp />}></Route>

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
