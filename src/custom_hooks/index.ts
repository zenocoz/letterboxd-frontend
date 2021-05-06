import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { updateUserInfo } from "../store/user/reducer"
import { getMovie } from "../store/movie/reducer"
import { API } from "../API"

export const useMovieStatus = (
  // userId: string,
  movieId: string,
  imdbID: string
): any => {
  const dispatch = useDispatch()

  const { loggedIn, userInfo } = useSelector((state: any) => state.user)

  const watch = () => {
    if (loggedIn) {
      Promise.all([API.addSeenToMovie(userInfo._id, movieId)]).then((resp) => {
        console.log(resp)
        dispatch(updateUserInfo())
        dispatch(getMovie(imdbID))
      })
    }
  }

  const unwatch = () => {
    if (loggedIn) {
      Promise.all([API.removeSeenMovie(userInfo._id, movieId)]).then((resp) => {
        console.log(resp)
        dispatch(updateUserInfo())
        dispatch(getMovie(imdbID))
      })
    }
  }

  return { watch, unwatch }
}

export const useFollow = (memberId: string): any => {
  const dispatch = useDispatch()
  const { loggedIn, userInfo } = useSelector((state: any) => state.user)

  const follow = () => {
    if (loggedIn) {
      Promise.all([API.followMember(userInfo._id, memberId)]).then((resp) => {
        dispatch(updateUserInfo())
      })
    }
  }
  const unfollow = () => {
    if (loggedIn) {
      Promise.all([API.unfollowMember(userInfo._id, memberId)]).then((resp) => {
        dispatch(updateUserInfo())
      })
    }
  }

  return { follow, unfollow }
}

export const useInterval = (callback: any, delay: number): any => {
  const savedCallback: any = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => {
        clearInterval(id)
      }
    }
  }, [callback, delay])
}
