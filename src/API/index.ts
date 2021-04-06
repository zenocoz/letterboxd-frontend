import axios from "axios"
import { IMovie } from "../store/store.d"

export const API = {
  getMoviesByTitle: async (query: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/films?title=${query}`
        // "http://localhost:3002/api/externalFilmApi?title=" + query,
      )

      return response.data
    } catch (err) {
      console.log(err)
    }
  },
  addSeenToMovie: async (userId: string, movie: IMovie) => {
    console.log("user ID", userId)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/films/${movie._id}/seen/${userId}`,
        {
          headers: { "Content-type": "application/json" },
        }
      )
      if (response.statusText === "OK") {
        console.log(`${movie.Title} watched by`, userId)
      } else {
        console.log("something went wrong in adding to seenBy")
      }
    } catch (err) {
      console.log(err)
    }
  },

  getUser: async () => {
    try {
      const user = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/users/me`,
        {
          withCredentials: true,
        }
      )
      console.log("getUSer,", user.data)
      return user.data
    } catch (err) {
      console.log(err)
    }
  },
}
