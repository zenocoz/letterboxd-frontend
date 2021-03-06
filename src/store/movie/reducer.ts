import * as actionTypes from "./actionTypes"
import { MovieState, MovieAction, DispatchType } from "./movie.d"
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
    rating: 0,
    views: 0,
  },
}

const reducer = (state: MovieState = initialState, action: MovieAction) => {
  switch (action.type) {
    case actionTypes.SET_MOVIE:
      return {
        ...state,
        movieInfo: action.payload,
      }
    case actionTypes.REMOVE_MOVIE:
      return {
        ...state,
        movieInfo: initialState.movieInfo,
      }
  }
  return state
}

export const getMovie = (query: string) => {
  return (dispatch: DispatchType) => {
    API.getMoviesByImdbId(query)
      .then((res) => dispatch({ type: actionTypes.SET_MOVIE, payload: res }))
      .catch((err) => console.log(err))
  }
}

export const clearMovieData = () => {
  return { type: actionTypes.REMOVE_MOVIE }
}
export default reducer
