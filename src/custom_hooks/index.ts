import { useMemo } from "react"
import { useDispatch } from "react-redux"

import { updateUserInfo } from "../store/user/reducer"
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
      dispatch(updateUserInfo())
      dispatch(getMovie(imdbID))
    })
  }

  const unwatch = () => {
    Promise.all([API.removeSeenMovie(userId, movieId)]).then((resp) => {
      console.log(resp)
      dispatch(updateUserInfo())
      dispatch(getMovie(imdbID))
    })
  }

  return { watch, unwatch }
}

export const useUserInfo = (userId: string, movieId: string): any => {
  const dispatch = useDispatch()

  const follow = () => {
    Promise.all([API.followMember(userId, movieId)]).then((resp) => {
      dispatch(updateUserInfo())
    })
  }
  const unfollow = () => {
    Promise.all([API.unfollowMember(userId, movieId)]).then((resp) => {
      dispatch(updateUserInfo())
    })
  }

  return { follow, unfollow }
}
