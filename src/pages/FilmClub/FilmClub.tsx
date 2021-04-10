import React from "react"
import { Jumbotron, Row, Col, Button } from "react-bootstrap"
import PopularMembers from "../../components/PopularMembers/PopularMembers"
import PopularMovies from "../../components/PopularMovies/PopularMovies"
import "./FilmClub.css"
import { IMovie } from "../../interface"
import { API } from "../../API"
import { useEffect, useState } from "react"
import MovieCard from "../../components/MovieCard/MovieCard"

const FilmClub = () => {
  const [movies, setMovies] = useState<Array<IMovie>>([])
  //placeholder function
  const getMovies = (): void => {
    const imdbIds: Array<string> = [
      "tt0072684",
      "tt0078788",
      "tt0079501",
      "tt0086984",
      //   "tt0076740",
      //   "tt0075612",
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
        <Col>
          <div className="d-flex club-hero mt-2 justify-content-between">
            <h1 className="offset-3">Welcome to your Film Club</h1>
            <Button type="primary">Create a film club</Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={8}>
          <div
            className="mt-2 mb-2"
            style={{
              width: "100%",
              height: "8vh",
              backgroundColor: "#89249c",
            }}
          >
            your film club #
          </div>
          <div
            className="mt-2 mb-2"
            style={{
              width: "100%",
              height: "8vh",
              backgroundColor: "#89249c",
            }}
          >
            your film club #
          </div>
          <div
            className="mt-2 mb-2"
            style={{
              width: "100%",
              height: "8vh",
              backgroundColor: "#89249c",
            }}
          >
            your film club #
          </div>
          <Row>
            {movies.length > 0 &&
              movies.map((movie: IMovie) => (
                <Col sm={12} md={3}>
                  {" "}
                  <MovieCard movie={movie} key={movie.imdbID} />
                </Col>
              ))}
          </Row>
        </Col>
        <Col sm={12} md={4}>
          <PopularMembers />
        </Col>
      </Row>
      <Row>
        <Col>
          <PopularMovies />
        </Col>
      </Row>
    </>
  )
}

export default FilmClub
