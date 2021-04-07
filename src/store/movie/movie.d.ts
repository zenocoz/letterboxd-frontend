import { IMovie } from "../../interface"

export type MovieState = {
  movieInfo: IMovie
}

export type MovieAction = {
  type: string
  payload: IMovie
}

export type DispatchType = (args: MovieAction) => MovieAction
