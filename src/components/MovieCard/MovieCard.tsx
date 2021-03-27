import { useContext } from "react"
import { IMovieCardProps } from "./interface"
import { UserContext } from "../../context"

//external dependencies
import { Card, Col } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faClock } from "@fortawesome/free-solid-svg-icons"

//style
import "./MovieCard.css"

const MovieCard = ({ movie }: IMovieCardProps) => {
  const history = useHistory()
  const { providerUser } = useContext(UserContext)
  const { user } = providerUser

  return (
    <>
      {!user ? (
        <Col className="md-8 mb-4">
          <Card
            className="movie-card position-relative"
            style={{ width: "10rem" }}
          >
            <Card.Img
              className="img-fluid rounded w-100"
              variant="top"
              src={movie.Poster}
              onClick={() => history.push(`/film/${movie.Title}`)}
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
                <h6>{movie.Title}</h6>
                <h6>{movie.Year}</h6>
                <div className="icons  align-items-center">
                  <p>
                    {" "}
                    <FontAwesomeIcon icon={faEye} size="3x" color="green" />
                  </p>
                  <p>
                    {" "}
                    <FontAwesomeIcon icon={faClock} size="3x" color="gold" />
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
          <Card style={{ width: "10rem" }}>
            <Card.Img
              variant="top"
              src={movie.Poster}
              onClick={() => history.push(`/film/${movie.Title}`)}
            />
            {/* //TODO must have an overlay showing friends name and stars or review
            //and title */}
          </Card>
        </Col>
      )}
    </>
  )
}

export default MovieCard
