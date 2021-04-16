import { useState, useEffect } from "react"
import { Row } from "react-bootstrap"
import { API } from "../../API"
import MovieCard from "../../components/MovieCard/MovieCard"
import MovieCardBig from "../../components/MovieCardBig/MovieCardBig"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faStar, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"

//types and style
import { IMovie } from "../../interface"
import { IHighRatedMovies } from "./interface"

const HighRatedMovies = ({ big, limit }: IHighRatedMovies) => {
  const [movies, setMovies] = useState<Array<IMovie>>([])

  const { loggedIn, userInfo } = useSelector((state: any) => state.user)

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
              loggedIn={loggedIn}
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
                  icon:
                    movie.seenBy.length > 0 &&
                    movie.seenBy.find((user) => user._id === userInfo._id) ? (
                      <FontAwesomeIcon icon={faEye} color={"green"} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} color={"grey"} />
                    ),
                  handler: () => alert(`starred movie is ${i}`),
                },
              ]}
            />
          ))}
    </>
  )
}

export default HighRatedMovies
