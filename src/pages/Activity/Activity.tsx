import { resolveAny } from "node:dns"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { IMovie } from "../../interface"
import { API } from "../../API"
import { Row } from "react-bootstrap"
import MovieCard from "../../components/MovieCard/MovieCard"

const Activity = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: any) => state.user)
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
  return (
    <Row>
      {movies.length > 0 &&
        movies.map((movie, i) => <MovieCard movie={movie} key={i} />)}
    </Row>
  )
}

export default Activity
