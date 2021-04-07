import { IMovie } from "../../interface"

export type SearchState = {
  movieList: IMovie[]
  keyword: string
}

export type SearchAction = {
  type: string
  payload: IMovie[]
}

export type DispatchType = (args: SearcgAction) => SearchAction
