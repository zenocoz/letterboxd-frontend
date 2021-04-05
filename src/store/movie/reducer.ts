import * as actionTypes from "./actionTypes"
import { MovieState, MovieAction, IMovie } from "../store"
// import { initialState } from "../configureStore"
import { API } from "../../API"

const initialState: any = {
  Title: "",
  Year: "",
  Runtime: "",
  Genre: "",
  Director: "",
  Writer: "",
  Actors: "",
  Plot: "",
  Language: "",
  Country: "",
  Poster: "",
  imdbID: "",
}

const reducer = (state: MovieState = initialState, action: MovieAction) => {
  switch (action.type) {
    case actionTypes.ADD_MOVIE:
      return {
        ...state,
        movie: action.payload,
      }
  }
  return state
}

export const getMovie = (query: string) => {
  return (dispatch: any) => {
    API.getMoviesByTitle(query)
      .then((res) => dispatch({ type: actionTypes.ADD_MOVIE, payload: res }))
      .catch((err) => console.log(err))
  }
}

export default reducer
