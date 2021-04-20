import React, { useState, useEffect } from "react"
import { IMemberMiniProps } from "./interface"

const MemberMini = ({
  username,
  watchedMovies,
  picture,
  movieId,
}: IMemberMiniProps) => {
  const [rating, setRating] = useState(null)

  useEffect(() => {
    if (watchedMovies) {
      const movie = watchedMovies.find((movie) => movie._id === movieId)
      if (movie) {
        setRating(movie.rating)
      }
    }
    console.log(username)
    console.log("watchedMovies", watchedMovies)
  }, [])

  return (
    <div
      style={{
        width: "4rem",
        height: "100%",
        backgroundColor: "#05c1f6",
      }}
    >
      <img src={picture} style={{ width: "100%", borderRadius: "50px" }} />
      {username}
      <p>stars</p>
      <p>{rating && rating}</p>
    </div>
  )
}

export default MemberMini
