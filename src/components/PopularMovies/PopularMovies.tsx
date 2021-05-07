//hooks and context
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

//types and style
import { IMovie } from "../../interface"
import "./PopularMovies.css"

//components and apis
import { API } from "../../API"
import MovieCard from "../MovieCard/MovieCard"

const PopularMovies = () => {
  const [movies, setMovies] = useState<Array<IMovie>>([])
  const { loggedIn } = useSelector((state: any) => state.user)
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
    sortedMovies.slice(0, 12).forEach((sorted: any) => {
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
    <div className="row popular  mb-4">
      {movies.length > 0 &&
        movies.map((movie, i): any => (
          <div style={{ width: "80px" }}>
            <MovieCard
              loggedIn={loggedIn}
              movie={movie}
              key={movie.imdbID}
              onMouseLeave={() => setHovered(-1)}
              onMouseEnter={() => setHovered(i)}
              hovered={hovered === i}
            />
          </div>
        ))}
    </div>
  )
}

export default PopularMovies
