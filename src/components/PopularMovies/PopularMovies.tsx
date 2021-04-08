import React from "react"

//hooks and context
import { useEffect, useState } from "react"

//types and style
import { IMovie } from "../../interface"
import "./PopularMovies.css"

//components and apis
import MovieCardSmall from "../MovieCardSmall/MovieCardSmall"
import { API } from "../../API"

const PopularMovies = () => {
  const [movies, setMovies] = useState<Array<IMovie>>([])

  const getMovies = (): void => {
    const imdbIds: Array<string> = [
      "tt9620292",
      "tt0066921",
      "tt0067641",
      "tt0974015",
      "tt0070359",
      "tt0102511",
      "tt0037820",
      "tt0086617",
      "tt0090756",
      "tt0069293",
      "tt0092099",
      "tt0053779",
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
    <div className="popular d-flex">
      {movies.length > 0 &&
        movies.map((movie): any => (
          <MovieCardSmall {...movie} key={movie.imdbID} />
        ))}
    </div>
  )
}

export default PopularMovies
