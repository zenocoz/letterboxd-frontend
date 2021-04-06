import { IMovie } from "../../interface"

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

export type MovieAction = {
  type: string
  payload: IMovie
}

export type DispatchType = (args: MovieAction) => MovieAction
