//hooks and context
import { useEffect, useState } from "react"

//types and style
import { IMovie } from "../../interface"
import "./PopularMovies.css"

//components and apis
import MovieCardSmall from "../MovieCardSmall/MovieCardSmall"
import { API } from "../../API"
import MovieCard from "../MovieCard/MovieCard"

import { Row } from "react-bootstrap"

import { useSelector } from "react-redux"

const PopularMovies = () => {
  const [movies, setMovies] = useState<Array<IMovie>>([])
  const { loggedIn, userInfo } = useSelector((state: any) => state.user)
  const [hovered, setHovered] = useState(-1)

  const findPopularMovies = async () => {
    const movieData = await API.getAllMoviesData()

    const sortedMovies = await movieData.sort(function (a: any, b: any) {
      if (a.views < b.views) {
        return 1
      } else {
        return -1
      }
    })
    const retrievedMovies: Array<Promise<IMovie>> = []
    sortedMovies.slice(0, 11).forEach((sorted: any) => {
      let movie: Promise<IMovie> = API.getMoviesByImdbId(sorted.imdbID)
      retrievedMovies.push(movie)
    })

    Promise.all(retrievedMovies).then((values) => {
      setMovies(values)
    })
  }

  useEffect(() => {
    findPopularMovies()
  }, [])

  return (
    <div className="row popular d-flex no-gutters">
      {movies.length > 0 &&
        movies.map((movie, i): any => (
          <MovieCardSmall
            {...movie}
            key={movie.imdbID}
            withInfo={false}
            loggedIn={loggedIn}
            onMouseLeave={() => setHovered(-1)}
            onMouseEnter={() => setHovered(i)}
            hovered={hovered === i}
          />

          // <MovieCard
          //   {...movie}
          //   // key={movie.imdbID}
          //   loggedIn={loggedIn}
          //   onMouseLeave={() => setHovered(-1)}
          //   onMouseEnter={() => setHovered(i)}
          //   hovered={hovered === i}
          // />
        ))}
    </div>
  )
}

export default PopularMovies
