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
}
