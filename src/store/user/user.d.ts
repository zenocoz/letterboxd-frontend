import { IUser } from "../../interface"

// export interface IUser {
//   _id: string
//   email: string
//   username: string
//   watchedMovies: array<IMovie>
//   followers: array<IUser>
//   following: array<IUser>
//   reviews: array<string>
// }

export type UserState = {
  userInfo: IUser
}

export type UserAction = {
  type: string
  payload: IUser
}

export type DispatchType = (args: UserAction) => UserAction
