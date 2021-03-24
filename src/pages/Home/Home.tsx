import React, { useEffect, useState, useContext } from "react"
import "./Home.css"
import { IMovieObject } from "../interface"
import MovieCard from "../../components/MovieCard/MovieCard"
import { API } from "../../API"
import { Row, Button, Col, Card, Container } from "react-bootstrap"
import UserContext from "../../context/UserContext"

const Landing = () => {
  const [newMovies, setNewMovies] = useState<Array<IMovieObject>>([])
  const [popularMovies, setPopularMovies] = useState<Array<IMovieObject>>([])

  const { user, setUser }: any = useContext(UserContext)

  //TODO new from friends - below is a placeholder function only for layout purposes
  const getNewFromFriends = (): void => {
    const titles: Array<string> = [
      "Justice League",
      "Promising Young Woman",
      "Isle of the Dead",
      "Four Nights of a Dreamer",
      "A Clockwork Orange",
      "The mother and the whore",
    ]
    const retrievedMovies: Array<Promise<IMovieObject>> = []
    titles.forEach((title) => {
      let movie: Promise<IMovieObject> = API.getMoviesByTitle(title)
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
      "blue velvet",
      "Naked Lunch",
      "Top Gun",
      "solaris",
      "La Dolce Vita",
      "The Year of Living Dangerously",
    ]
    const retrievedMovies: Array<Promise<IMovieObject>> = []
    titles.forEach((title) => {
      let movie: Promise<IMovieObject> = API.getMoviesByTitle(title)
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
          newMovies.map((movie: IMovieObject) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
      </Row>
      <Row>
        {popularMovies.length > 0 &&
          popularMovies.map((movie: IMovieObject) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
      </Row>
      <div className="welcome-texts">
        <p>{user}</p>
        {user ? (
          <Button
            onClick={() => {
              setUser(null)
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

export default Landing
