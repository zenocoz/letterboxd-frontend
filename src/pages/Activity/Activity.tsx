import { resolveAny } from "node:dns"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { IMovie } from "../../interface"
import { API } from "../../API"
import { Row, Col } from "react-bootstrap"
import MovieCard from "../../components/MovieCard/MovieCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faStar, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import Following from "../../components/Following/Following"

const Activity = () => {
  const dispatch = useDispatch()
  const { userInfo, loggedIn } = useSelector((state: any) => state.user)
  const [movies, setMovies] = useState<Array<IMovie>>([])

  const getWatchedMovies = async () => {
    const retrievedMovies: Array<Promise<IMovie>> = []
    userInfo.watchedMovies.forEach((watched: any) => {
      let movie: Promise<IMovie> = API.getMoviesById(watched._id)
      retrievedMovies.push(movie)
    })

    Promise.all(retrievedMovies).then((values) => {
      console.log(values)
      setMovies(values)
    })
  }
  useEffect(() => {
    getWatchedMovies()
  }, [])
  const [hovered, setHovered] = useState(-1)
  function like(i: number) {
    alert(`Liked movie is ${i}`)
  }
  return (
    <>
      <Row>
        <Col>
          <h3 style={{ color: "white" }}>Movies watched by you</h3>
        </Col>
      </Row>
      <Row>
        {movies.length > 0 &&
          movies.map((movie, i) => (
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
      </Row>
      <Following withInfo={true} />
    </>
  )
}

export default Activity
