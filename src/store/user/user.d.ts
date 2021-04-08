import { IUser } from "../../interface"

export type UserState = {
  loggedIn: boolean
  userInfo: IUser
}

export type UserAction = {
  type: string
  payload: IUser
}

export type DispatchType = (args: UserAction) => UserAction
