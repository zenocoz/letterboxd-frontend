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
  // const { providerUserId } = useContext(UserContext)
  // const { userId } = providerUserId
  const [wasSeen, setWasSeen] = useState(false)

  const { _id, username } = useSelector((state: any) => state.user.userInfo)

  // const checkViews = () => {

  //   const userFound = movie.seenBy.find((user) => user._id === _id)

  //   if (userFound) {
  //     console.log(`${movie.Title} seen by ${movie.seenBy}`)
  //     setWasSeen(true)
  //   } else {
  //     console.log("FALSE")
  //     setWasSeen(false)
  //   }
  // }

  useEffect(() => {
    let movieChecked: boolean = checkViews(movie.seenBy, _id)
    if (movieChecked === true) {
      setWasSeen(true)
    } else {
      setWasSeen(false)
    }
  }, [])

  return (
    <>
      {username ? (
        <Col className="md-8 mb-4" md={1}>
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
                          API.removeSeenMovie(_id, movie._id)
                          setWasSeen(false)
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        size="3x"
                        color={"grey"}
                        onClick={() => {
                          API.addSeenToMovie(_id, movie._id)
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
            className="movie-card position-relative"
          >
            <Card.Img
              className="img-fluid rounded w-100"
              variant="top"
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
