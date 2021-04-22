import { IReviewProps } from "./interface"
import { API } from "../../API"
import { useState, useEffect } from "react"

const Review = ({ text, authorId, movieId }: IReviewProps) => {
  const [username, setUserName] = useState("")
  const [filmName, setFilmName] = useState("")
  const [filmPoster, setFilmPoster] = useState("")

  useEffect(() => {
    ;(async () => {
      const user = await API.getMemberById(authorId)
      const movie = await API.getMoviesById(movieId)
      setUserName(user.username)
      setFilmName(movie.Title)
      setFilmPoster(movie.Poster)
    })()
  }, [])

  return (
    <div
      className="mb-2 d-flex"
      style={{
        width: "100%",
        height: "15vh",
        backgroundColor: "#e68eb5",
      }}
    >
      <img src={filmPoster} style={{ height: "100%" }} />

      <p>
        {filmName}

        {username}
        {text}
      </p>
    </div>
  )
}

export default Review
