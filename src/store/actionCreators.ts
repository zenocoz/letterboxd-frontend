import { MovieAction, IMovie } from "./store.d"
import * as actionTypes from "./actionTypes"
import { API } from "../API"

export function addMovie(movie: IMovie) {
  const action: MovieAction = {
    type: actionTypes.ADD_MOVIE,
    movie,
  }

  return movie
}

export function removeMovie(movie: IMovie) {
  const action: MovieAction = {
    type: actionTypes.REMOVE_MOVIE,
    movie,
  }
  return
}

export const getMovie = async (name: string) => (dispatch: any) => {
  dispatch({ type: actionTypes.ADD_MOVIE })
  API.getMoviesByTitle(name)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      return dispatch({ type: actionTypes.ADD_MOVIE, payload: data })
    })
    .catch((err) => console.log(err))
}
