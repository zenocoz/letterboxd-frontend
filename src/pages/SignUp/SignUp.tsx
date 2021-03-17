import React, { useEffect, useState } from "react"
import "./SignUp.css"
import { IMovieObject } from "./interface"
import MovieCard from "../../components/MovieCard/MovieCard"
import { API } from "../../API"
import { Row, Jumbotron, Button, Col, Card, Container } from "react-bootstrap"

const SignUp = () => {
  const [movies, setMovies] = useState<any>([]) //ANY
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  const getMovies = (): void => {
    const titles: Array<string> = [
      "barry lyndon",
      "apocalypse now",
      "mad max",
      "body double",
      "sorcerer",
      "Three women",
    ]
    const retrievedMovies: Array<Promise<IMovieObject>> = []
    titles.forEach((title) => {
      let movie: Promise<IMovieObject> = API.getMoviesByTitle(title)
      retrievedMovies.push(movie)
    })

    Promise.all(retrievedMovies).then((values) => {
      console.log(values)
      setMovies(values)
    })
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <>
      <Row>
        <Col>
          <Jumbotron fluid></Jumbotron>
        </Col>
      </Row>
      <Row>
        {" "}
        <Col>
          {" "}
          <div className="welcome-texts">
            <h1>Track films you've watched.</h1>
            <h1>Save those you want to see.</h1>
            <h1>Tell your friends what's good.</h1>
            <Button variant="success">GET STARTED - IT'S FREE!</Button>
            <p>The social network for film lovers</p>
          </div>
        </Col>
      </Row>
      <Row>
        {movies.length > 0 &&
          movies.map((movie: IMovieObject) => (
            <MovieCard movie={movie} loggedIn={loggedIn} />
          ))}
      </Row>
    </>
  )
}

export default SignUp
