import * as actionTypes from "./actionTypes"
import { MovieState, MovieAction, IMovie } from "./store"
// import { initialState } from "./configureStore"

const initialState: MovieState = {
  movie: {
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
  },
}

const reducer = (
  state: MovieState = initialState,
  action: MovieAction
): MovieState => {
  switch (action.type) {
    case actionTypes.ADD_MOVIE:
      const newMovie: IMovie = {
        Title: action.movie.Title,
        Year: action.movie.Year,
        Runtime: action.movie.Runtime,
        Genre: action.movie.Genre,
        Director: action.movie.Director,
        Writer: action.movie.Writer,
        Actors: action.movie.Actors,
        Plot: action.movie.Plot,
        Language: action.movie.Language,
        Country: action.movie.Country,
        Poster: action.movie.Poster,
        imdbID: action.movie.imdbID,
      }
      return {
        ...state,
        movie: newMovie,
      }
    case actionTypes.REMOVE_MOVIE:
      return {
        ...state,
        movie: initialState.movie,
      }
  }
  return state
}

export default reducer
