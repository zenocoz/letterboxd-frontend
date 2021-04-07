export interface IMovie {
  _id: any
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
  seenBy: IUser[]
}

export interface IUser {
  _id: string | null
  email: string | null
  username: string | null
  watchedMovies: IMovie[]
  watchList: IMovie[]
  followers: IUser[]
  following: IUser[]

  reviews: string[]
}

// export interface Rating {
//   Source: string
//   Value: string
// }
