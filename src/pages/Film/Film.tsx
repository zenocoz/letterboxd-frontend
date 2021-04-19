import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovie, clearMovieData } from "../../store/movie/reducer"
import { API } from "../../API"
import { updateUserInfo } from "../../store/user/reducer"
import { checkViews } from "../../utils"
import { useMovieStatus } from "../../custom_hooks"

//styles and types
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
import axios from "axios"

const Film = () => {
  const { imdbID } = useParams<{ imdbID: string }>() //ANY
  const [wasSeen, setWasSeen] = useState(false)
  const [showModalReview, setShowModalReview] = useState(false)
  const [movieRating, setMovieRating] = useState(0)
  // const [globalRating, setGlobalRating] = useState(0)

  const dispatch = useDispatch()
  const { loggedIn, userInfo, following } = useSelector(
    (state: any) => state.user
  )
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
    rating,
    views,
  } = useSelector((state: any) => state.movie.movieInfo)

  const actions = useMovieStatus(userInfo._id, _id, imdbID)

  const getRating = (): number => {
    const movie = userInfo.watchedMovies.find((movie: any) => movie._id === _id)
    if (movie) {
      console.log("get rating", movie.rating)
      return movie.rating
    } else {
      console.log("couldn't retrieve rating")
      return 0
    }
  }

  useEffect(() => {
    setMovieRating(getRating())
  }, [userInfo.watchedMovies, _id, wasSeen])

  useEffect(() => {
    dispatch(getMovie(imdbID))
  }, [imdbID, dispatch])

  useEffect(() => {
    if (seenBy && userInfo) {
      setWasSeen(checkViews(seenBy, userInfo._id))
    }
  }, [seenBy, userInfo])

  useEffect((): any => {
    return () => {
      dispatch(clearMovieData())
    }
  }, [])

  const [reviewText, setReviewText] = useState("")

  const handleReviewLogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(e.target.value)
  }

  const calculateGlobalRating = async (e: any) => {
    e.preventDefault()
    const userRating = parseInt(e.target.value, 10)
    const rating10 = parseInt(rating, 10)
    const members = await API.getAllMembers()
    let globalRating = (userRating + rating10) / views
    await submitRating(userRating, globalRating)
  }

  const submitRating = async (userRating: number, globalRating: number) => {
    Promise.all([
      await API.addRatingToMovie(userInfo._id, _id, userRating, globalRating),
    ]).then((resp) => {
      console.log(resp)
      dispatch(updateUserInfo())
      dispatch(getMovie(imdbID))
    })
  }

  const submitReviewLog = async (e: any) => {
    e.preventDefault()
    const reviewInfo = {
      authorId: userInfo._id,
      movieId: _id,
      text: reviewText,
    }
    const config = {
      headers: { "Content-type": "application/json" },
    }
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_SERVER}/api/reviews`,
      reviewInfo,
      config
    )
    if (response.statusText === "OK") {
      console.log(`review added`, response.data)
    } else {
      console.log("something went wrong in adding review")
    }
  }
  return (
    <>
      {/* <Row>
        <Col>
          <Jumbotron>BIG PICTURE</Jumbotron>
        </Col>
      </Row> */}
      <Row className="mt-3" style={{ height: "360px" }}>
        <Col
          xs={12}
          md={3}
          className="align-items-center text-center"
          style={{
            width: "245px",
            height: "100%",
            backgroundColor: "#14181d",
          }}
        >
          <div>
            <img src={Poster} style={{ width: "230px", height: "345px" }} />
            {/* <ListGroup>
              <ListGroup.Item className="bg-dark">
                Cras justo odio
              </ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup> */}
          </div>
        </Col>
        <Col
          xs={12}
          md={6}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#14181d",
            color: "#587997",
            left: "37px",
          }}
        >
          <div className="relevant-info">
            <h1 style={{ color: "white" }}> {Title}</h1>
            <p>
              {Year} Directed by {Director}
            </p>
            <p>{Plot}</p>
            <p style={{ color: "white" }}>Cast</p>
            <p>{Actors}</p>
          </div>
        </Col>
        <Col
          xs={12}
          md={3}
          style={{
            height: "100%",
            backgroundColor: "#14181d",
            color: "#587997",
            left: "47px",
          }}
        >
          {loggedIn ? (
            <div className="icons">
              <p>
                {wasSeen ? (
                  <>
                    <FontAwesomeIcon
                      icon={faEye}
                      size="3x"
                      color={"green"}
                      onClick={() => {
                        actions.unwatch()
                      }}
                    />

                    <div style={{ width: "6rem" }}>
                      <Form.Group>
                        <Form.Label>Rate</Form.Label>
                        <Form.Control
                          type="number"
                          onChange={calculateGlobalRating.bind(this)}
                          as="select"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                    <p>Rated {movieRating}</p>
                  </>
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    size="3x"
                    color={"grey"}
                    onClick={() => {
                      actions.watch()
                    }}
                  />
                )}
              </p>

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
                    <Form onSubmit={submitReviewLog}>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="Add a review"
                          value={reviewText}
                          onChange={handleReviewLogChange}
                        />
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
        </Col>
      </Row>
      <Row className="justify-content-center">
        <div
          className="col-6"
          style={{ height: "6rem", backgroundColor: "pink", left: "49px" }}
        ></div>
      </Row>
    </>
  )
}

export default Film
