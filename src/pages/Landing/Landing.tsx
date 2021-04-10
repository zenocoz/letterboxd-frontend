//hooks and context
import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../context"

//types and style
import "./Landing.css"
import { IMovie } from "../../interface"

//components and apis
import MovieCard from "../../components/MovieCard/MovieCard"
import CreateAccount from "../../components/Auth/CreateAccount/CreateAccount"
import Banner from "../../components/Banner/Banner"
import SiteOffers from "../../components/SiteOffers/SiteOffers"
import PopularMovies from "../../components/PopularMovies/PopularMovies"
import PopularReviews from "../../components/PopularReviews/PopularReviews"
import List from "../../components/List/List"

import { API } from "../../API"

//external libraries
import { Row, Jumbotron, Button, Col } from "react-bootstrap"

const Landing = () => {
  const { providerModals }: any = useContext(UserContext)
  const { createAccount, setCreateAccount } = providerModals.accountModal

  const [movies, setMovies] = useState<Array<IMovie>>([])

  //placeholder function
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
          <div className="jumbo"></div>
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
      <Row>
        <Banner />
      </Row>
      <Row>
        <SiteOffers />
      </Row>
      <Row>
        <PopularMovies />
      </Row>
      <Row>
        <Col sm={12} md={8}>
          <PopularReviews />
        </Col>
        <Col sm={12} md={4}>
          <List />
          <List />
          <List />
          <List />
          <List />
        </Col>
      </Row>
    </>
  )
}

export default Landing
