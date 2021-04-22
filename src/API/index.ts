import axios from "axios"

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

  getMoviesById: async (filmId: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/films/internal/${filmId}`
      )
      return response.data
    } catch (err) {
      console.log(err)
    }
  },

  getAllMoviesData: async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/films/globalData`
      )
      if (response.statusText === "OK") {
        return response.data
      } else {
        console.log("something wrong in getting all movies data")
      }
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
  addRatingToMovie: async (
    userId: string,
    movieId: string,
    userRating: number,
    globalRating: number
  ) => {
    try {
      const config = {
        userId,
        userRating,
        globalRating,
        headers: { "Content-type": "application/json" },
      }
      const response = await axios.put(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/films/${movieId}/rate`,
        config
      )
      if (response.statusText === "OK") {
        console.log(`movie rated`)
      } else {
        console.log("could not rate movie")
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
      if (members) {
        return members.data
      } else {
        console.log("couldn't fetch all members")
      }
    } catch (err) {
      console.log(err)
    }
  },
  getMemberById: async (memberId: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/users/member/${memberId}`
      )
      if (response) {
        return response.data
      } else {
        console.log("couldn't retrieve member by id")
      }
    } catch (err) {
      console.log(err)
    }
  },

  followMember: async (userId: string, memberId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/users/${userId}/follow/${memberId}`,
        {
          headers: { "Content-type": "application/json" },
        }
      )
      if (response) {
        console.log("member succsefully followed", response)
      } else {
        console.log("something went wrong in adding to seenBy")
      }
    } catch (err) {
      console.log(err)
    }
  },
  unfollowMember: async (userId: string, memberId: string) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/users/${userId}/follow/${memberId}`,
        {
          headers: { "Content-type": "application/json" },
        }
      )
      if (response.status < 400) {
        console.log("member succsefully unfollowed")
      } else {
        console.log("something went wrong in adding to seenBy")
      }
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

  getAllReviews: async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/reviews`
      )
      if (response) {
        return response.data
      } else {
        console.log("didn't get reviews")
      }
    } catch (err) {
      console.log(err)
    }
  },

  // postReview: async(review: any) => {

  //   try {}
  //   catch(err) {
  //     console.log(err)
  //   }
  // },

  createClub: async (clubData: any) => {
    try {
      const config = {
        clubData,
        headers: { "Content-type": "application/json" },
      }
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/clubs`,
        config
      )
      if (response.status < 400) {
        console.log("film club created with id", response.data)
        return response.data
      }
    } catch (err) {
      console.log(err)
    }
  },

  getUserMovieClubs: async (userId: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/clubs/${userId}`
      )
      if (response.status < 400) {
        return response.data
      } else {
        console.log("errors getting user clubs")
      }
    } catch (err) {
      console.log(err)
    }
  },
}
