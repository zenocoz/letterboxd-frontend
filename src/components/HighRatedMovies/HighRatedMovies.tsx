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

  const [hovered, setHovered] = useState(-1)
  // const movie = {
  //   image:
  //     "https://i.pinimg.com/736x/dc/66/64/dc666425b307216596a9b197aa885922.jpg"
  // };
  function like(i: number) {
    alert(`Liked movie is ${i}`)
  }

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
          movies.slice(0, limit).map((movie: IMovie, i: number) => (
            <MovieCard
              movie={movie}
              key={movie.imdbID}
              onMouseLeave={() => setHovered(-1)}
              onMouseEnter={() => setHovered(i)}
              hovered={hovered === i}
              actions={[
                {
                  icon: "❤️",
                  handler: () => like(i),
                },
                {
                  icon: "⭐️",
                  handler: () => alert(`starred movie is ${i}`),
                },
              ]}
            />
          ))}
    </>
  )
}

export default HighRatedMovies
