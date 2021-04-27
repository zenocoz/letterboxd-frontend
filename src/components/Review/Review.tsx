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
      className="row mb-2 d-flex align-items-center"
      style={{
        width: "100%",
        height: "15vh",
        backgroundColor: "#1c2228",
        borderRadius: "3px",
      }}
    >
      <div className="col-2 " style={{ height: "90%" }}>
        {" "}
        <img src={filmPoster} style={{ height: "100%" }} />
      </div>

      <div className="col-8" style={{ color: "white" }}>
        <div className="d-flex justify-content-between">
          <p>{filmName}</p>

          <p>by {username}</p>
        </div>
        <p> {text}</p>
      </div>
    </div>
  )
}

export default Review
