import * as actionTypes from "./actionTypes"
import { UserAction, UserState, IUser } from "./user.d"
import { API } from "../../API"
import Cookies from "js-cookie"

export const initialState: any = {
  _id: null,
  email: null,
  username: null,
  watchedMovies: [],
  watchList: [],
  followers: [],
  reviews: [],
}

const reducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        userInfo: action.payload,
      }
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        userInfo: initialState,
      }
  }
  return state
}

export const getUserInfo = () => {
  return (dispatch: any) => {
    // const accessToken = Cookies.get("accessToken")
    API.getUser()
      .then((res) => {
        console.log("getUserInfo", res)
        dispatch({ type: actionTypes.SET_USER, payload: res })
      })
      .catch((err) => console.log("getUserInfoerr", err))
  }
}

export const logoutUser = () => {
  return { type: actionTypes.LOGOUT_USER }
}

export default reducer
