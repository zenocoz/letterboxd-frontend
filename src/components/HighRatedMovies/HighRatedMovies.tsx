import { useState, useEffect } from "react"
import { Row } from "react-bootstrap"
import { API } from "../../API"
import MovieCard from "../../components/MovieCard/MovieCard"
import MovieCardBig from "../../components/MovieCardBig/MovieCardBig"

//types and style
import { IMovie } from "../../interface"
import { IHighRatedMovies } from "./interface"

const HighRatedMovies = ({ big, limit }: IHighRatedMovies) => {
  const [movies, setMovies] = useState<Array<IMovie>>([])

  const findHighRatedMovies = async () => {
    const movieData = await API.getAllMoviesData()
    const sortedByRating = await movieData.sort(function (a: any, b: any) {
      if (a.rating < b.rating) {
        return 1
      } else {
        return -1
      }
    })

    const retrievedMovies: Array<Promise<IMovie>> = []
    sortedByRating.slice(0, 12).forEach((sorted: any) => {
      let movie: Promise<IMovie> = API.getMoviesByImdbId(sorted.imdbID)
      retrievedMovies.push(movie)
    })

    Promise.all(retrievedMovies).then((values) => {
      console.log(values)
      setMovies(values)
    })
  }
  useEffect(() => {
    findHighRatedMovies()
  }, [])

  return (
    <>
      {big
        ? movies.length > 0 &&
          movies
            .slice(0, limit)
            .map((movie: IMovie) => (
              <MovieCardBig {...movie} key={movie.imdbID} />
            ))
        : movies.length > 0 &&
          movies
            .slice(0, limit)
            .map((movie: IMovie) => (
              <MovieCard movie={movie} key={movie.imdbID} />
            ))}
    </>
  )
}

export default HighRatedMovies
