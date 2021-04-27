import { Col, Card } from "react-bootstrap"
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

{
  /* <Col className="md-8 mb-4 mr-2">
<Card className="movie-card position-relative" style={{ width: "12rem" }}>
  <Card.Img
    className="img-fluid rounded w-100"
    variant="top"
    style={{ width: "100%" }}
    src={Poster}
  />
  <div className="options-container">
    <div className="options-content">
      <div className="d-flex align-items-center mb-3">
        {/* <div className="play-btn gradient"></div> */
}
{
  /* <h6 className="mb-0">Add</h6> */
}
//   <span className="ml-auto">
//     {/* <!-- <i class="fa fa-plus fa-lg" aria-hidden="true"></i> --> */}
//   </span>
// </div>
// <div className="movie-info">
//   <h6 onClick={() => history.push(`/film/${imdbID}`)}>{Title}</h6>
//   <h6>{Year}</h6>
// </div>
{
  /* <div className="icons">
        <p>
          {wasSeen ? (
            <FontAwesomeIcon
              icon={faEye}
              size="3x"
              color={"green"}
              onClick={() => {
                API.removeSeenMovie(userInfo._id, movie._id)
                setWasSeen(false)
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEyeSlash}
              size="3x"
              color={"grey"}
              onClick={() => {
                API.addSeenToMovie(userInfo._id, movie._id)
                setWasSeen(true)
              }}
            />
          )}
        </p>
        <p>
          {" "}
          <FontAwesomeIcon icon={faStar} size="3x" color="gold" />
        </p>
      </div> */
}
//       <p style={{ height: "4em" }}></p>{" "}
//       {/* <div className="movie-footer">
//       <span className="mr-2">{movie.Director}</span>
//     </div> */}
//     </div>
//   </div>
// </Card>
// </Col> */}
