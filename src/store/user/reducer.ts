import * as actionTypes from "./actionTypes"
import { IUser, UserState, UserAction } from "./user.d"
// import { initialState } from "../configureStore"
import axios from "axios"
import Cookies from "js-cookie"

const initialState: any = {
  _id: "",
  email: "",
  username: "",
  watchedMovies: [],
}

const reducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        user: initialState,
      }
  }
  return state
}

//with Cookies (not working)
export const getUserInfo = () => {
  return (dispatch: any) => {
    const accessToken = Cookies.get("accessToken")
    console.log(accessToken)

    axios
      .get(`${process.env.REACT_APP_LOCAL_SERVER}/api/users/me`, {
        withCredentials: true,
      })
      .then((res) => dispatch({ type: actionTypes.SET_USER, payload: res }))
      .catch((err) => console.log(err))
  }
}

//with Bearer
// export const getUserInfo = () => {
//   return (dispatch: any) => {
//     const accessToken = Cookies.get("accessToken")
//     let config = {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         Authorization: "Bearer " + accessToken,
//       },
//     }

//     axios
//       .get(`${process.env.REACT_APP_LOCAL_SERVER}/api/users/meBe`, config)
//       .then((res) => dispatch({ type: actionTypes.SET_USER, payload: res }))
//       .catch((err) => console.log(err))
//   }
// }

export default reducer
