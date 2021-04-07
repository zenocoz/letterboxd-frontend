import { IUser } from "../../interface"

export type UserState = {
  userInfo: IUser
}

export type UserAction = {
  type: string
  payload: IUser
}

export type DispatchType = (args: UserAction) => UserAction
