import { useContext } from "react"
import { IMovieCardProps } from "./interface"
import { UserContext } from "../../context"
import { API } from "../../API"

//external libraries
import { Card, Col } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faStar, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
// import axios from "axios"

//style
import "./MovieCard.css"

const MovieCard = ({ movie }: IMovieCardProps) => {
  const history = useHistory()
  const { providerUserId } = useContext(UserContext)
  const { userId } = providerUserId

  return (
    <>
      {!userId ? (
        <Col className="md-8 mb-4">
          <Card
            className="movie-card position-relative"
            style={{ width: "10rem" }}
          >
            <Card.Img
              className="img-fluid rounded w-100"
              variant="top"
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
                  <h6 onClick={() => history.push(`/film/${movie.Title}`)}>
                    {movie.Title}
                  </h6>
                  <h6>{movie.Year}</h6>
                </div>
                <div className="icons">
                  <p>
                    {" "}
                    <FontAwesomeIcon
                      icon={faEye}
                      size="3x"
                      color="green"
                      onClick={() => {
                        API.addSeenToMovie(userId, movie)
                      }}
                    />
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
        <Col>
          <Card
            style={{ width: "10rem" }}
            className="movie-card position-relative"
          >
            <Card.Img
              className="img-fluid rounded w-100"
              variant="top"
              src={movie.Poster}
              onClick={() => history.push(`/film/${movie.Title}`)}
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
                      onClick={() => {
                        API.addSeenToMovie(userId, movie)
                      }}
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
