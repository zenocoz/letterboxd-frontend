import { useMemo } from "react"
import { useDispatch } from "react-redux"

import { updateWatchedMovies } from "../store/user/reducer"
import { getMovie } from "../store/movie/reducer"
import { API } from "../API"

export const useMovieStatus = (
  userId: string,
  movieId: string,
  imdbID: string
): any => {
  const dispatch = useDispatch()

  const watch = () => {
    Promise.all([API.addSeenToMovie(userId, movieId)]).then((resp) => {
      console.log(resp)
      dispatch(updateWatchedMovies())
      dispatch(getMovie(imdbID))
    })
  }

  const unwatch = () => {
    Promise.all([API.removeSeenMovie(userId, movieId)]).then((resp) => {
      console.log(resp)
      dispatch(updateWatchedMovies())
      dispatch(getMovie(imdbID))
    })
  }

  return { watch, unwatch }
}
