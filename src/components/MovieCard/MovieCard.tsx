//redux and hooks
import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { IMovieCardProps } from "./interface"
// import { UserContext } from "../../context"
import { API } from "../../API"
import { checkViews } from "../../utils"

//external libraries
import { Card, Col } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faStar, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

//style
import "./MovieCard.css"

const MovieCard = ({ movie }: IMovieCardProps) => {
  const history = useHistory()
  const [wasSeen, setWasSeen] = useState(false)

  const { loggedIn, userInfo } = useSelector((state: any) => state.user)

  useEffect(() => {
    if (loggedIn) {
      let movieChecked: boolean = checkViews(movie.seenBy, userInfo._id)
      if (movieChecked === true) {
        setWasSeen(true)
      } else {
        setWasSeen(false)
      }
    }
  }, [loggedIn])

  return (
    <>
      {loggedIn ? (
        <Col className="md-8 mb-4 mr-2" md={1} style={{ height: "10rem" }}>
          <Card
            className="movie-card position-relative"
            style={{ width: "100%" }}
          >
            <Card.Img
              className="img-fluid rounded w-100"
              variant="top"
              style={{ width: "100%" }}
              src={movie.Poster}
            />
            <div className="options-container">
              <div className="options-content">
                <div className="d-flex align-items-center mb-3">
                  {/* <div className="play-btn gradient"></div> */}
                  {/* <h6 className="mb-0">Add</h6> */}
                  <span className="ml-auto">
                    {/* <!-- <i class="fa fa-plus fa-lg" aria-hidden="true"></i> --> */}
                  </span>
                </div>
                <div className="movie-info">
                  <h6 onClick={() => history.push(`/film/${movie.imdbID}`)}>
                    {movie.Title}
                  </h6>
                  <h6>{movie.Year}</h6>
                </div>
                <div className="icons">
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
                </div>
                <p style={{ height: "4em" }}></p>{" "}
                <div className="movie-footer">
                  <span className="mr-2">{movie.Director}</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      ) : (
        <Col md={2}>
          <Card
            style={{ width: "10rem" }}
            className="movie-card position-relative mb-2"
          >
            <Card.Img
              className="img-fluid rounded w-100"
              variant="top"
              style={{ width: "100%", height: "100%" }}
              src={movie.Poster}
              onClick={() => history.push(`/film/${movie.imdbID}`)}
            />
            <div className="options-container">
              <div className="options-content">
                {/* <div className="icons">
                  <p>
                    {" "}
                    <FontAwesomeIcon icon={faEye} size="3x" color="green" />
                  </p>
                  <p>
                    {" "}
                    <FontAwesomeIcon icon={faClock} size="3x" color="gold" />
                  </p>
                </div> */}
                <p style={{ height: "4em" }}></p>{" "}
                <div className="movie-footer">
                  <span className="mr-2">
                    {" "}
                    <FontAwesomeIcon
                      icon={faEye}
                      size="3x"
                      color="green"
                      // onClick={() => {
                      //  go to movie page but not logged in
                      // }}
                    />
                    <FontAwesomeIcon icon={faStar} size="3x" color="gold" />
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      )}
    </>
  )
}

export default MovieCard
