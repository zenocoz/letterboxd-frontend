declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

export interface IMovie {
  Title: string
  Year: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Poster: string
  imdbID: string
}

export type MovieState = {
  movie: IMovie
}

export type MovieAction = {
  type: string
  movie: IMovie
}

export type DispatchType = (args: MovieAction) => MovieAction
