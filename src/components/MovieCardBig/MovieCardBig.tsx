import { Col, Card } from "react-bootstrap"
import { IMovieCardBigProps } from "./interface"
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faStar, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

const MovieCardBig = ({ Poster, imdbID, Title, Year }: IMovieCardBigProps) => {
  const history = useHistory()
  return (
    <Col className="md-8 mb-4 mr-2">
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
              {/* <div className="play-btn gradient"></div> */}
              {/* <h6 className="mb-0">Add</h6> */}
              <span className="ml-auto">
                {/* <!-- <i class="fa fa-plus fa-lg" aria-hidden="true"></i> --> */}
              </span>
            </div>
            <div className="movie-info">
              <h6 onClick={() => history.push(`/film/${imdbID}`)}>{Title}</h6>
              <h6>{Year}</h6>
            </div>
            {/* <div className="icons">
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
            </div> */}
            <p style={{ height: "4em" }}></p>{" "}
            {/* <div className="movie-footer">
            <span className="mr-2">{movie.Director}</span>
          </div> */}
          </div>
        </div>
      </Card>
    </Col>
  )
}

export default MovieCardBig
