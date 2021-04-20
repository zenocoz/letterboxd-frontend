import { IUser, IMovie } from "../interface"

//checks into movie array
export const checkViews = (seenBy: IUser[], id: string) => {
  if (seenBy.length > 0) {
    const userFound = seenBy.find((user) => user._id === id)
    if (userFound) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export const checkUserViews = (watchedMovies: IMovie[], movieId: string) => {
  if (watchedMovies.length > 0) {
    const movieFound = watchedMovies.find(
      (movie: IMovie) => movie._id === movieId
    )
    if (movieFound) {
      return true
    } else {
      console.log("user has not seen the movie")
    }
  } else {
    return false
  }
}
