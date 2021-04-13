import axios from "axios"
import MovieCardSmall from "../components/MovieCardSmall/MovieCardSmall"
import { IMovie } from "../interface"

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
  getMoviesByImdbId: async (query: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/films?imdbId=${query}`
      )

      return response.data
    } catch (err) {
      console.log(err)
    }
  },
  searchByKeyword: async (query: string) => {
    //searches first in own db then external if not found
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_SERVER}/api/films?query=${query}`
    )

    console.log(response.data)
    return response.data
  },
  addSeenToMovie: async (userId: string, movieId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/films/${movieId}/seen/${userId}`,
        {
          headers: { "Content-type": "application/json" },
        }
      )
      if (response.statusText === "OK") {
        console.log(`movie watched by`, userId)
      } else {
        console.log("something went wrong in adding to seenBy")
      }
    } catch (err) {
      console.log(err)
    }
  },
  removeSeenMovie: async (userId: string, movieId: string) => {
    try {
      console.log("MOVIE ID REM", movieId)
      const response = await axios.put(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/films/${movieId}/seen/${userId}`,
        {
          headers: { "Content-type": "application/json" },
        }
      )
      if (response.statusText === "OK") {
        console.log(`UNwatched by`, userId)
      } else {
        console.log("something went wrong in unwatching movie")
      }
    } catch (err) {
      console.log(err)
    }
  },
  addRatingToMovie: async (userId: string, movieId: string, rating: number) => {
    try {
      const config = { rating, headers: { "Content-type": "application/json" } }
      const response = await axios.put(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/films/${movieId}/rate`,
        config
      )
      console.log(response.data)
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

  getAllMembers: async () => {
    try {
      const members = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/users`
      )
      return members.data
    } catch (err) {
      console.log(err)
    }
  },

  getWatchedMovies: async (userId: string) => {
    try {
      const movies = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/users/films/${userId}`
      )
      if (movies) {
        return movies.data
      }
    } catch (err) {
      console.log(err)
    }
  },
}
