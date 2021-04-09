import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovie } from "../../store/movie/reducer"
import { API } from "../../API"
import { getUserInfo } from "../../store/user/reducer"
import { checkViews } from "../../utils"

//styles
import "./Film.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faStar, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

//external dependencies
import { useParams } from "react-router-dom"
import { Row, Col, Jumbotron } from "react-bootstrap"

const Film = () => {
  const { imdbID }: any = useParams() //ANY
  const [wasSeen, setWasSeen] = useState(false)

  const dispatch = useDispatch()
  const { loggedIn, userInfo } = useSelector((state: any) => state.user)
  const {
    _id,
    Title,
    Poster,
    Year,
    Runtime,
    Genre,
    Director,
    seenBy,
  } = useSelector((state: any) => state.movie.movieInfo)

  useEffect(() => {
    dispatch(getMovie(imdbID))
  }, [imdbID, dispatch])

  useEffect(() => {
    setWasSeen(checkViews(seenBy, userInfo._id))
  }, [loggedIn, dispatch])

  useEffect((): any => {
    return () => {
      dispatch(getUserInfo())
      dispatch(getMovie(imdbID))
    }
  }, [])

  return (
    <Row>
      <div className="details-container">
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
      )}
    </Row>
  )
}

export default Film
