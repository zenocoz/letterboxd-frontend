//hooks and context
import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../context"

//types and style
import "./Landing.css"
import { IMovie } from "../../interface"

//components and apis
// import MovieCard from "../../components/MovieCard/MovieCard"
import CreateAccount from "../../components/Auth/CreateAccount/CreateAccount"
import Banner from "../../components/Banner/Banner"
import SiteOffers from "../../components/SiteOffers/SiteOffers"
import PopularMovies from "../../components/PopularMovies/PopularMovies"
import PopularReviews from "../../components/PopularReviews/PopularReviews"
import List from "../../components/List/List"
import HighRatedMovies from "../../components/HighRatedMovies/HighRatedMovies"

// import { API } from "../../API"

//external libraries
import { Row, Jumbotron, Button, Col } from "react-bootstrap"

const Landing = () => {
  const { providerModals }: any = useContext(UserContext)
  const { createAccount, setCreateAccount } = providerModals.accountModal

  //DO NOT DELETE - use to retrieve a minimum of movies when collection is
  // const [movies, setMovies] = useState<Array<IMovie>>([])

  // const findHighRatedMovies = async () => {
  //   const movieData = await API.getAllMoviesData()
  //   const sortedByRating = await movieData.sort(function (a: any, b: any) {
  //     if (a.rating < b.rating) {
  //       return 1
  //     } else {
  //       return -1
  //     }
  //   })

  //   const retrievedMovies: Array<Promise<IMovie>> = []
  //   sortedByRating.slice(0, 6).forEach((sorted: any) => {
  //     let movie: Promise<IMovie> = API.getMoviesByImdbId(sorted.imdbID)
  //     retrievedMovies.push(movie)
  //   })

  //   Promise.all(retrievedMovies).then((values) => {
  //     console.log(values)
  //     setMovies(values)
  //   })
  // }

  //placeholder function
  // const getMovies = (): void => {
  //   const imdbIds: Array<string> = [
  //     "tt0072684",
  //     "tt0078788",
  //     "tt0079501",
  //     "tt0086984",
  //     "tt0076740",
  //     "tt0075612",
  // "tt0079256",
  // "tt0088247",
  // "tt0070359",
  // "tt9620292",
  // "tt0066921",
  // "tt0974015"
  //   ]
  //   const retrievedMovies: Array<Promise<IMovie>> = []
  //   imdbIds.forEach((imdbId) => {
  //     let movie: Promise<IMovie> = API.getMoviesByImdbId(imdbId)
  //     retrievedMovies.push(movie)
  //   })

  //   Promise.all(retrievedMovies).then((values) => {
  //     console.log(values)
  //     setMovies(values)
  //   })
  // }
  //
  // {movies.length > 0 &&
  // movies.map((movie: IMovie) => (
  //   <MovieCard movie={movie} key={movie.imdbID} />
  // ))}

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
            <Button
              style={{ marginTop: 30, marginBottom: 30 }}
              onClick={() => setCreateAccount(true)}
              variant="success"
            >
              GET STARTED - IT'S FREE!
            </Button>
            <p>The social network for film lovers</p>
          </div>
          {createAccount === true && <CreateAccount />}
        </Col>
      </Row>
      <HighRatedMovies big={false} limit={6} />
      {/* <Row className="mb-4 d-flex no-gutters">
        <HighRatedMovies big={false} limit={6} />
      </Row> */}
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
        {/* <Col sm={12} md={4}>
          <List />
          <List />
          <List />
          <List />
          <List />
        </Col> */}
      </Row>
    </>
  )
}

export default Landing
