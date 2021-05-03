import { IMovieCardBigProps } from "./interface"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faStar, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

//hooks
import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useMovieStatus } from "../../custom_hooks"

//utils
import { checkUserViews } from "../../utils"

const MovieCardBig = ({
  Poster,
  imdbID,
  Title,
  Year,
  _id,
  onMouseEnter,
  onMouseLeave,
  hovered,
  loggedIn,
}: IMovieCardBigProps) => {
  const history = useHistory()
  // const width = "100%"
  // const height = "350px"

  const { userInfo } = useSelector((state: any) => state.user)
  const movieAction = useMovieStatus(userInfo._id, _id, imdbID)
  const [movieSeen, setMovieSeen] = useState<any>(false)

  function like(i: number) {
    alert(`Liked movie is }`)
  }

  useEffect(() => {
    setMovieSeen(checkUserViews(userInfo.watchedMovies, _id))
  }, [userInfo.watchedMovies])

  const actions = [
    {
      icon: movieSeen ? (
        <FontAwesomeIcon icon={faEye} color={"green"} size="2x" />
      ) : (
        <FontAwesomeIcon icon={faEyeSlash} color={"grey"} size="2x" />
      ),
      handler: movieSeen
        ? () => {
            movieAction.unwatch()
          }
        : () => {
            movieAction.watch()
          },
    },
    {
      icon: <FontAwesomeIcon icon={faStar} color={"gold"} size="2x" />,
      handler: () => like(1),
    },
  ]

  return (
    <div
      className="col-3"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        maxWidth: "300px",
        height: "400px",
        transition: "0.2s",
        cursor: "pointer",
        background: `${hovered ? "black" : "transparent"}`,
        border: `8px solid ${hovered ? "green" : "transparent"}`,
        borderRadius: "3px",
        paddingBottom: `${hovered ? 0 : "50px"}`,
      }}
    >
      <img
        style={{
          width: "100%",
          height: "350px",
          transition: "0.2s",
          opacity: `${hovered ? "0.5" : "1"}`,
          borderRadius: "3px",
        }}
        alt="batman"
        src={Poster}
        onClick={() => {
          history.push(`/film/${imdbID}`)
        }}
      />

      <div
        style={{
          display: hovered ? "flex" : "none",
          justifyContent: "space-evenly",
          width: "100%",
          position: "relative",
          bottom: "15%",
          backgroundColor: "transparent",
          color: "#fff",
        }}
      >
        {loggedIn &&
          actions.map((action: any) => (
            <span onClick={action.handler}>{action.icon}</span>
          ))}
      </div>
    </div>
  )
}

export default MovieCardBig
