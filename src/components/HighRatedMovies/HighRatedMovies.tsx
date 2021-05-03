import { useState, useEffect } from "react"
import { API } from "../../API"
import MovieCard from "../../components/MovieCard/MovieCard"
import MovieCardBig from "../../components/MovieCardBig/MovieCardBig"
import { useSelector } from "react-redux"

//types and style
import { IMovie } from "../../interface"
import { IHighRatedMovies } from "./interface"
import "./HighRatedMovies.css"

const HighRatedMovies = ({ big, limit }: IHighRatedMovies) => {
  const [movies, setMovies] = useState<Array<IMovie>>([])

  const { loggedIn } = useSelector((state: any) => state.user)

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
      setMovies(values)
    })
  }
  useEffect(() => {
    findHighRatedMovies()
  }, [])

  const [hovered, setHovered] = useState(-1)

  // function like(i: number) {
  //   alert(`Liked movie is ${i}`)
  // }

  return (
    <div className="row high-rated">
      {big
        ? movies.length > 0 &&
          movies
            .slice(0, limit)
            .map((movie: IMovie, i: number) => (
              <MovieCardBig
                {...movie}
                key={i}
                loggedIn={loggedIn}
                onMouseLeave={() => setHovered(-1)}
                onMouseEnter={() => setHovered(i)}
                hovered={hovered === i}
              />
            ))
        : movies.length > 0 &&
          movies
            .slice(0, limit)
            .map((movie: IMovie, i: number) => (
              <MovieCard
                loggedIn={loggedIn}
                movie={movie}
                key={movie.imdbID}
                onMouseLeave={() => setHovered(-1)}
                onMouseEnter={() => setHovered(i)}
                hovered={hovered === i}
              />
            ))}
    </div>
  )
}

export default HighRatedMovies

// handler: () => alert(`starred movie is ${i}`)
