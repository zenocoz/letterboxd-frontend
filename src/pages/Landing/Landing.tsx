import React, { useEffect, useState, useContext } from "react"
import "./Landing.css"
import { IMovie } from "../../interface"
import MovieCard from "../../components/MovieCard/MovieCard"
import CreateAccount from "../../components/Auth/CreateAccount/CreateAccount"
import { API } from "../../API"
import { Row, Jumbotron, Button, Col } from "react-bootstrap"
import { UserContext } from "../../context"
import { useHistory } from "react-router-dom"

const Landing = () => {
  const history = useHistory()

  // const { providerUser }: any = useContext(UserContext)
  // const { user, setUser } = providerUser

  const { providerModals }: any = useContext(UserContext)
  const { createAccount, setCreateAccount } = providerModals.accountModal

  const [movies, setMovies] = useState<Array<IMovie>>([])

  // const getMovies = (): void => {
  //   const titles: Array<string> = [
  //     "Barry Lyndon",
  //     "Apocalypse Now",
  //     "Mad Max",
  //     "Body Double",
  //     "Sorcerer",
  //     "Three Women",
  //   ]
  //   const retrievedMovies: Array<Promise<IMovie>> = []
  //   titles.forEach((title) => {
  //     let movie: Promise<IMovie> = API.getMoviesByTitle(title)
  //     retrievedMovies.push(movie)
  //   })

  //   Promise.all(retrievedMovies).then((values) => {
  //     console.log(values)
  //     setMovies(values)
  //   })
  // }

  const getMovies = (): void => {
    const imdbIds: Array<string> = [
      "tt0072684",
      "tt0078788",
      "tt0079501",
      "tt0086984",
      "tt0076740",
      "tt0075612",
    ]
    const retrievedMovies: Array<Promise<IMovie>> = []
    imdbIds.forEach((imdbId) => {
      let movie: Promise<IMovie> = API.getMoviesByImdbId(imdbId)
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
          <div className="overlay"></div>
          <div className="jumbotron"></div>
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
            {/* <p>{user}</p>
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
                  history.push("/home")
                }}
              >
                login
              </Button>
            )} */}
          </div>
          {createAccount === true && <CreateAccount />}
        </Col>
      </Row>
      <Row className="md-8 mb-4">
        {movies.length > 0 &&
          movies.map((movie: IMovie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
      </Row>
    </>
  )
}

export default Landing
