import * as actionTypes from "./actionTypes"
import { DispatchType, UserAction, UserState } from "./user.d"
import { API } from "../../API"

export const initialState: UserState = {
  loggedIn: false,
  userInfo: {
    _id: null,
    email: null,
    username: null,
    watchedMovies: [],
    watchList: [],
    followers: [],
    following: [],
    reviews: [],
  },
}

const reducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        loggedIn: true,
        userInfo: action.payload,
      }
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        loggedIn: false,
        userInfo: initialState.userInfo,
      }

    case actionTypes.UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      }
  }
  return state
}

export const getUserInfo = () => {
  return (dispatch: DispatchType) => {
    API.getUser()
      .then((res) => {
        dispatch({ type: actionTypes.SET_USER, payload: res })
      })
      .catch((err) => console.log("getUserInfoerr", err))
  }
}

export const updateUserInfo = () => {
  return (dispatch: DispatchType) => {
    API.getUser()
      .then((res) => {
        dispatch({ type: actionTypes.UPDATE_USER_INFO, payload: res })
      })
      .catch((err) => console.log("set followers error", err))
  }
}

export const logoutUser = () => {
  return { type: actionTypes.LOGOUT_USER }
}

export default reducer
