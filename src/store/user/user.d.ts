export interface IUser {
  _id: string
  email: string
  username: string
  watchedMovies: array<string>
}

export type UserState = {
  user: IUser
}

export type UserAction = {
  type: string
  payload: IUser
}

export type DispatchType = (args: UserAction) => UserAction
