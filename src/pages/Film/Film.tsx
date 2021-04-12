import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovie, clearMovieData } from "../../store/movie/reducer"
import { API } from "../../API"
import { updateWatchedMovies } from "../../store/user/reducer"
import { checkViews } from "../../utils"

//styles
import "./Film.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faStar, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

//external dependencies
import { useParams } from "react-router-dom"
import {
  Row,
  Col,
  Jumbotron,
  ListGroup,
  Modal,
  Button,
  Form,
} from "react-bootstrap"

const Film = () => {
  const { imdbID }: any = useParams() //ANY
  const [wasSeen, setWasSeen] = useState(false)
  const [showModalReview, setShowModalReview] = useState(false)

  const dispatch = useDispatch()
  const { loggedIn, userInfo } = useSelector((state: any) => state.user)
  const {
    _id,
    Title,
    Poster,
    Actors,
    Year,
    Runtime,
    Genre,
    Plot,
    Director,
    seenBy,
  } = useSelector((state: any) => state.movie.movieInfo)

  useEffect(() => {
    dispatch(getMovie(imdbID))
  }, [imdbID, dispatch])

  useEffect(() => {
    if (seenBy && loggedIn) {
      setWasSeen(checkViews(seenBy, userInfo._id))
    }
  }, [seenBy])

  useEffect((): any => {
    return () => {
      dispatch(clearMovieData())
    }
  }, [])

  const watch = (): void => {
    API.addSeenToMovie(userInfo._id, _id)
    dispatch(updateWatchedMovies())
    dispatch(getMovie(imdbID))
  }
  const unwatch = (): void => {
    API.removeSeenMovie(userInfo._id, _id)
    dispatch(updateWatchedMovies())
    dispatch(getMovie(imdbID))
  }

  return (
    <>
      <Row>
        <Jumbotron>BIG PICTURE</Jumbotron>
      </Row>
      <Row>
        <Col xs={12} md={3}>
          <div
            style={{ width: "100%", height: "100vh", backgroundColor: "#fff" }}
          >
            <img src={Poster} />
            <ListGroup>
              <ListGroup.Item className="bg-dark">
                Cras justo odio
              </ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div
            style={{ width: "100%", height: "100vh", backgroundColor: "#fff" }}
          >
            <span>
              {" "}
              {Title} Directed by {Director}
            </span>
            <p>{Plot}</p>
            <p>{Actors}</p>
          </div>
        </Col>
        <Col xs={12} md={3}>
          <div
            style={{ width: "100%", height: "45vh", backgroundColor: "#fff" }}
          >
            {loggedIn ? (
              <div className="icons">
                <p>
                  {wasSeen ? (
                    <FontAwesomeIcon
                      icon={faEye}
                      size="3x"
                      color={"green"}
                      onClick={() => {
                        unwatch()
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      size="3x"
                      color={"grey"}
                      onClick={() => {
                        watch()
                      }}
                    />
                  )}
                </p>
                <p>Rated</p>
                <button
                  onClick={() => {
                    setShowModalReview(true)
                  }}
                >
                  {" "}
                  Review or log
                </button>
                {showModalReview && (
                  <Modal.Dialog>
                    <Modal.Header closeButton>
                      <Modal.Title>I watched...</Modal.Title>
                      <span>
                        {Title} {Year}
                      </span>
                    </Modal.Header>

                    <Modal.Body>
                      <Form>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            placeholder="Add a review"
                          />
                          <Form.Text>the movie was awesome</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox">
                          <Form.Check
                            type="checkbox"
                            label="Specify the date you watched it"
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Save
                        </Button>
                      </Form>
                    </Modal.Body>

                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setShowModalReview(false)
                        }}
                      >
                        Close
                      </Button>
                      <Button variant="primary">Save changes</Button>
                    </Modal.Footer>
                  </Modal.Dialog>
                )}
              </div>
            ) : (
              <div>sign in to log, rate or review </div>
            )}
          </div>
        </Col>

        {/* <div className="details-container">
          <h1>{Title}</h1>
          <h2>{Director}</h2>
          <h6>{Year}</h6>
        </div>
        <img src={Poster} style={{ width: "100%" }} />
        {loggedIn && (
          <div className="icons">
            <p>
              {wasSeen ? (
                <FontAwesomeIcon
                  icon={faEye}
                  size="3x"
                  color={"green"}
                  onClick={() => {
                    API.removeSeenMovie(userInfo._id, _id)
                    setWasSeen(false)
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  size="3x"
                  color={"grey"}
                  onClick={() => {
                    API.addSeenToMovie(userInfo._id, _id)
                    setWasSeen(true)
                  }}
                />
              )}
            </p>
          </div>
        )} */}
      </Row>
    </>
  )
}

export default Film
