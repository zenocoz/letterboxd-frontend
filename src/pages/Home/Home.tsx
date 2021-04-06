import { useEffect, useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getUserInfo } from "../../store/user/reducer"

import "./Home.css"
// import { IMovie } from "../../interface"
import { IMovie } from "../../interface"
import MovieCard from "../../components/MovieCard/MovieCard"
import { API } from "../../API"
import { Row, Button } from "react-bootstrap"
import { UserContext } from "../../context"
import { useHistory } from "react-router-dom"

const Home = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  const { _id, username, watchedMovies } = useSelector(
    (state: any) => state.user
  )

  const [newMovies, setNewMovies] = useState<Array<IMovie>>([])
  const [popularMovies, setPopularMovies] = useState<Array<IMovie>>([])

  const { providerUser }: any = useContext(UserContext)
  const { user, setUser } = providerUser

  //TODO new from friends - below is a placeholder function only for layout purposes
  const getNewFromFriends = (): void => {
    const titles: Array<string> = [
      "Justice League",
      "Promising Young Woman",
      "Isle of the Dead",
      "Four Nights of a Dreamer",
      "A Clockwork Orange",
      "The Mother and the Whore",
    ]
    const retrievedMovies: Array<Promise<IMovie>> = []
    titles.forEach((title) => {
      let movie: Promise<IMovie> = API.getMoviesByTitle(title)
      retrievedMovies.push(movie)
    })

    Promise.all(retrievedMovies).then((values) => {
      console.log(values)
      setNewMovies(values)
    })
  }

  //TODO Popular with friends - below is a placeholder function only for layout purposes
  const getPopularFromFriends = (): void => {
    const titles: Array<string> = [
      "Blue Velvet",
      "Naked Lunch",
      "Top Gun",
      "Solaris",
      "La Dolce Vita",
      "The Year of Living Dangerously",
    ]
    const retrievedMovies: Array<Promise<IMovie>> = []
    titles.forEach((title) => {
      let movie: Promise<IMovie> = API.getMoviesByTitle(title)
      retrievedMovies.push(movie)
    })

    Promise.all(retrievedMovies).then((values) => {
      console.log(values)
      setPopularMovies(values)
    })
  }

  useEffect(() => {
    getNewFromFriends()
    getPopularFromFriends()
  }, [])

  return (
    <>
      <Row>
        {newMovies.length > 0 &&
          newMovies.map((movie: IMovie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
      </Row>
      <Row>
        {popularMovies.length > 0 &&
          popularMovies.map((movie: IMovie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
      </Row>
      <div className="welcome-texts">
        <p>{username}</p>
        {username ? (
          <Button
            onClick={() => {
              setUser(null)
              history.push("/")
            }}
          >
            logout
          </Button>
        ) : (
          <Button
            onClick={() => {
              const user = "federico"
              setUser(user)
            }}
          >
            login
          </Button>
        )}
      </div>
    </>
  )
}

export default Home
