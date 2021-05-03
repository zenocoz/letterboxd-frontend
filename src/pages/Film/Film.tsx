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
import { faEye, faEyeSlash, faStar } from "@fortawesome/free-solid-svg-icons"
// import { IUser } from "../../interface"

//external dependencies
import { useParams } from "react-router-dom"
import { Row, Col, ListGroup, Modal, Button, Form } from "react-bootstrap"
import axios from "axios"
import MemberMini from "../../components/MemberMini/MemberMini"
import Rating from "react-rating"

const Film = () => {
  const { imdbID } = useParams<{ imdbID: string }>()

  //store
  const dispatch = useDispatch()
  const { loggedIn, userInfo } = useSelector((state: any) => state.user)
  const { movieInfo } = useSelector((state: any) => state.movie)

  //custom
  const actions = useMovieStatus(userInfo._id, movieInfo._id, imdbID)

  //state
  const [wasSeen, setWasSeen] = useState(false)
  const [showModalReview, setShowModalReview] = useState(false)
  const [movieRating, setMovieRating] = useState(0)
  const [friendsWhoSawMovie, setFriendsWhoSawMovie] = useState<any>([])
  const [reviewText, setReviewText] = useState("")

  const getRating = (): number => {
    const movie = userInfo.watchedMovies.find(
      (movie: any) => movie._id === movieInfo._id
    )
    if (movie) {
      return movie.rating
    } else {
      return 0
    }
  }

  const checkFriendsMovieViews = () => {
    if (movieInfo.seenBy.length > 0 && userInfo.following.length > 0) {
      const friendsWhoSawMovie = movieInfo.seenBy.filter((user: any) =>
        userInfo.following.some((member: any) => user._id === member)
      )
      setFriendsWhoSawMovie(friendsWhoSawMovie)
    }
  }

  useEffect(() => {
    if (movieInfo.seenBy && userInfo) {
      checkFriendsMovieViews()
      dispatch(updateUserInfo())
    }
  }, [movieInfo, imdbID])

  useEffect(() => {
    setMovieRating(getRating())
  }, [userInfo.watchedMovies, movieInfo._id, wasSeen])

  useEffect(() => {
    dispatch(getMovie(imdbID))
  }, [imdbID, dispatch])

  useEffect(() => {
    if (movieInfo.seenBy && userInfo) {
      setWasSeen(checkViews(movieInfo.seenBy, userInfo._id))
    }
  }, [movieInfo.seenBy, userInfo])

  useEffect((): any => {
    return () => {
      dispatch(clearMovieData())
    }
  }, [])

  const handleReviewLogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(e.target.value)
  }

  const calculateGlobalRating = async (value: number) => {
    const userRating = value
    const rating10 = parseInt(movieInfo.rating, 10)
    let globalRating = (userRating + rating10) / movieInfo.views
    await submitRating(userRating, globalRating)
  }
  // const calculateGlobalRating = async (e: any) => {
  //   e.preventDefault()
  //   const userRating = parseInt(e.target.value, 10)
  //   const rating10 = parseInt(movieInfo.rating, 10)
  //   let globalRating = (userRating + rating10) / movieInfo.views
  //   await submitRating(userRating, globalRating)
  // }

  const submitRating = async (userRating: number, globalRating: number) => {
    Promise.all([
      await API.addRatingToMovie(
        userInfo._id,
        movieInfo._id,
        userRating,
        globalRating
      ),
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
      movieId: movieInfo._id,
      text: reviewText,
    }
    const config = {
      headers: { "Content-type": "application/json" },
    }
    const response = await axios.post(
      `${process.env.REACT_APP_REMOTE_SERVER}/api/reviews`,
      reviewInfo,
      config
    )

    console.log(`review added`, response.data)
    setReviewText("")
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
          <div
            className="align-items-center pt-3"
            style={{
              backgroundColor: "#1c2228",
              width: "270px",
              height: "385px",
              borderRadius: "10px",
            }}
          >
            <img
              src={movieInfo.Poster}
              alt=""
              style={{ width: "230px", height: "345px", borderRadius: "3px" }}
            />
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
            <h1 style={{ color: "white" }}> {movieInfo.Title}</h1>
            <p>
              {movieInfo.Year} Directed by {movieInfo.Director}
            </p>
            <p>{movieInfo.Plot}</p>
            <p style={{ color: "white" }}>Cast</p>
            <p>{movieInfo.Actors}</p>
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
                    <div style={{ width: "100%" }}>
                      <Rating
                        readonly={false}
                        initialRating={movieRating}
                        onChange={(value: number) => {
                          calculateGlobalRating(value)
                        }}
                        fractions={2}
                        emptySymbol={
                          <FontAwesomeIcon
                            icon={faStar}
                            size="2x"
                            color={"grey"}
                          />
                        }
                        fullSymbol={
                          <FontAwesomeIcon
                            icon={faStar}
                            size="2x"
                            color={"yellow"}
                          />
                        }
                      />
                      {/* <Form.Group>
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
                      </Form.Group> */}
                    </div>

                    {/* <p>
                      {movieRating !== 0 ? (
                        <div>{movieRating} stars</div>
                      ) : (
                        <div>You haven't given any stars</div>
                      )}
                    </p> */}
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
                style={{
                  position: "absolute",
                  bottom: "20px",
                  borderRadius: "3px",
                  backgroundColor: "#3c4e5d",
                  color: "white",
                  font: "Rubik",
                }}
                onClick={() => {
                  setShowModalReview(true)
                }}
              >
                {" "}
                Review or log
              </button>
              {showModalReview && (
                <Modal.Dialog
                  style={{ right: "7rem", bottom: "10rem", color: "white" }}
                >
                  <Modal.Title>I watched...</Modal.Title>
                  <span>
                    {movieInfo.Title} - {movieInfo.Year}
                  </span>

                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Add a review"
                          value={reviewText}
                          onChange={handleReviewLogChange}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setShowModalReview(false)
                        setReviewText("")
                      }}
                    >
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        submitReviewLog(e)
                        setShowModalReview(false)
                      }}
                    >
                      Submit Review
                    </Button>
                  </Modal.Footer>
                </Modal.Dialog>
              )}
            </div>
          ) : (
            <div>sign in to log, rate or review </div>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center" style={{ marginTop: "10rem" }}>
        <div
          className="col-6 d-flex"
          style={{ height: "6rem", backgroundColor: "#14181d", left: "49px" }}
        >
          {friendsWhoSawMovie.length > 0 &&
            friendsWhoSawMovie.map((member: any, i: number) => (
              <MemberMini
                member={member._id}
                movieId={movieInfo._id}
                key={i}
                withInfo={true}
              />
            ))}
        </div>
      </Row>
    </>
  )
}

export default Film
