import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import movieReducer from "./movie/reducer"
import userReducer from "./user/reducer"
import searchReducer from "./search/reducer"
import { initialState as userInitialState } from "./user/reducer"
import { initialState as movieInitialState } from "./movie/reducer"
import { initialState as searchInitialState } from "./search/reducer"

// import api from "./middleware/api"
// export const initialState = {
//   // currentSong: {},
//   // songs: {
//   // 	likedSongs: [],
//   // },
//   artist: {
//     loading: false,
//     errorMessage: null,
//     performer: {},
//     isError: false,
//   },

//   search: {
//     songList: [],
//     keyword: "",
//     loading: false,
//     errorMessage: null,
//   },
//   user: { userInfo: {}, isLoggedIn: false, playLists: [] },
// }

export const initialState: any = {
  movie: movieInitialState,
  user: userInitialState,
  search: searchInitialState,
}

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  movie: movieReducer,
  user: userReducer,
  search: searchReducer,
})

export default function configureStore(): any {
  return createStore<any, any, any, any>(
    rootReducer,
    initialState,
    composedEnhancer(applyMiddleware(thunk))
  )
}
