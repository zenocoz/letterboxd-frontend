//hooks and context
import { useEffect, useState } from "react"

//types and style
import { IMovie } from "../../interface"
import "./PopularMovies.css"

//components and apis
import MovieCardSmall from "../MovieCardSmall/MovieCardSmall"
import { API } from "../../API"

import { Row } from "react-bootstrap"

const PopularMovies = () => {
  const [movies, setMovies] = useState<Array<IMovie>>([])

  const findPopularMovies = async () => {
    const movieData = await API.getAllMoviesData()

    const sortedMovies = await movieData.sort(function (a: any, b: any) {
      if (a.views < b.views) {
        return 1
      } else {
        return -1
      }
    })
    console.log(sortedMovies)
    const retrievedMovies: Array<Promise<IMovie>> = []
    sortedMovies.slice(0, 11).forEach((sorted: any) => {
      let movie: Promise<IMovie> = API.getMoviesByImdbId(sorted.imdbID)
      retrievedMovies.push(movie)
    })

    Promise.all(retrievedMovies).then((values) => {
      console.log(values)
      setMovies(values)
    })
  }

  useEffect(() => {
    findPopularMovies()
  }, [])

  return (
    <Row className="popular d-flex">
      {movies.length > 0 &&
        movies.map((movie): any => (
          <MovieCardSmall {...movie} key={movie.imdbID} withInfo={false} />
        ))}
    </Row>
  )
}

export default PopularMovies
