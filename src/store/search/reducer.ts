import * as actionTypes from "./actionTypes"
import { SearchState, SearchAction } from "./search.d"
import { API } from "../../API"

export const initialState: SearchState = {
  movieList: [],
  keyword: "",
}

const reducer = (state: SearchState = initialState, action: SearchAction) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_RESULT:
      return {
        ...state,
        movieList: action.payload,
      }
    case actionTypes.SET_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      }
    default:
      return state
  }
}

//ACTION CREATORS

export const setKeyword = (keyword: string) => ({
  type: actionTypes.SET_KEYWORD,
  payload: keyword,
})

export const loadSearchResults = (keyword: string) => {
  return (dispatch: any) => {
    API.searchByKeyword(keyword)
      .then((res) => {
        console.log("search results", res)
        dispatch({ type: actionTypes.SET_SEARCH_RESULT, payload: res })
      })
      .catch((err) => console.log("search result error", err))
  }
}

export default reducer
