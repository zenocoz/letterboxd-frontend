import * as actionTypes from "./actionTypes"
import { MovieAction } from "../store"
import { MovieState } from "./movie.d"
import { API } from "../../API"

export const initialState: MovieState = {
  movieInfo: {
    _id: "",
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
    seenBy: [],
  },
}

const reducer = (state: MovieState = initialState, action: MovieAction) => {
  switch (action.type) {
    case actionTypes.ADD_MOVIE:
      return {
        ...state,
        movieInfo: action.payload,
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
