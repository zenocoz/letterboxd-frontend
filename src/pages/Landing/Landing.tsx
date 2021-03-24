import React, { useEffect, useState, useContext } from "react"
import "./Landing.css"
import { IMovieObject } from "../interface"
import MovieCard from "../../components/MovieCard/MovieCard"
import CreateAccount from "../../components/Auth/CreateAccount/CreateAccount"
import { API } from "../../API"
import { Row, Jumbotron, Button, Col, Card, Container } from "react-bootstrap"
import { UserContext } from "../../context"

const Landing = () => {
  const { user, setUser }: any = useContext(UserContext)

  const [movies, setMovies] = useState<Array<IMovieObject>>([])
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [createAccount, setCreateAccount] = useState(false)

  const handleClose = (show: boolean) => {
    setCreateAccount(show)
  }

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
        <Col className="md-8 mb-4">
          <Jumbotron fluid></Jumbotron>
        </Col>
      </Row>
      <Row>
        {" "}
        <Col className="md-8 mb-4">
          {" "}
          <div className="welcome-texts">
            <h1>Track films you've watched.</h1>
            <h1>Save those you want to see.</h1>
            <h1>Tell your friends what's good.</h1>
            <Button onClick={() => setCreateAccount(true)} variant="success">
              GET STARTED - IT'S FREE!
            </Button>
            <p>The social network for film lovers</p>
            <p>{user}</p>
            {user ? (
              <Button
                onClick={() => {
                  setUser(null)
                }}
              >
                logout
              </Button>
            ) : (
              <Button
                onClick={() => {
                  const user = "federico"
                  setUser(user)
                }}
              >
                login
              </Button>
            )}
          </div>
          {createAccount === true && (
            <CreateAccount handleClose={handleClose} />
          )}
        </Col>
      </Row>
      <Row>
        {movies.length > 0 &&
          movies.map((movie: IMovieObject) => (
            <MovieCard movie={movie} loggedIn={loggedIn} key={movie.imdbID} />
          ))}
      </Row>
    </>
  )
}

export default Landing
