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
  _id: string
  email: string
  username: string
  watchedMovies: IMovie[]
  followers: IUser[]
  following: IUser[]
  reviews: string[]
}

// export interface Rating {
//   Source: string
//   Value: string
// }