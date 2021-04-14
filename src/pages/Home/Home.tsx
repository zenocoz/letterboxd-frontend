import { useEffect, useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getUserInfo } from "../../store/user/reducer"

import "./Home.css"
// import { IMovie } from "../../interface"
import { IMovie } from "../../interface"
// import MovieCard from "../../components/MovieCard/MovieCard"
import { API } from "../../API"
import { Row, Button } from "react-bootstrap"
import { UserContext } from "../../context"
import { useHistory } from "react-router-dom"
import PopularMovies from "../../components/PopularMovies/PopularMovies"
import HighRatedMovies from "../../components/HighRatedMovies/HighRatedMovies"

const Home = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  const { username } = useSelector((state: any) => state.user.userInfo)

  const [newMovies, setNewMovies] = useState<Array<IMovie>>([])
  const [popularMovies, setPopularMovies] = useState<Array<IMovie>>([])

  // //TODO new from friends - below is a placeholder function only for layout purposes
  // const getNewFromFriends = (): void => {
  //   const titles: Array<string> = [
  //     "Justice League",
  //     "Promising Young Woman",
  //     "Isle of the Dead",
  //     "Four Nights of a Dreamer",
  //     "A Clockwork Orange",
  //     "The Mother and the Whore",
  //   ]
  //   const retrievedMovies: Array<Promise<IMovie>> = []
  //   titles.forEach((title) => {
  //     let movie: Promise<IMovie> = API.getMoviesByTitle(title)
  //     retrievedMovies.push(movie)
  //   })

  //   Promise.all(retrievedMovies).then((values) => {
  //     console.log(values)
  //     setNewMovies(values)
  //   })
  // }

  // //TODO Popular with friends - below is a placeholder function only for layout purposes
  // const getPopularFromFriends = (): void => {
  //   const titles: Array<string> = [
  //     "Blue Velvet",
  //     "Naked Lunch",
  //     "Top Gun",
  //     "Solaris",
  //     "La Dolce Vita",
  //     "The Year of Living Dangerously",
  //   ]
  //   const retrievedMovies: Array<Promise<IMovie>> = []
  //   titles.forEach((title) => {
  //     let movie: Promise<IMovie> = API.getMoviesByTitle(title)
  //     retrievedMovies.push(movie)
  //   })

  //   Promise.all(retrievedMovies).then((values) => {
  //     console.log(values)
  //     setPopularMovies(values)
  //   })
  // }

  // useEffect(() => {
  //   getNewFromFriends()
  //   getPopularFromFriends()
  // }, [])

  return (
    <>
      <Row>
        {/* {newMovies.length > 0 &&
          newMovies.map((movie: IMovie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))} */}
        <HighRatedMovies big={true} />
      </Row>
      <Row>
        <PopularMovies />
        {/* {popularMovies.length > 0 &&
          popularMovies.map((movie: IMovie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))} */}
      </Row>
    </>
  )
}

export default Home
