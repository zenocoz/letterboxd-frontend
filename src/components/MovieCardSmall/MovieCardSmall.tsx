import React, { useContext } from "react"
import "./MovieCardSmall.css"
import { IMovieCardSmallProps } from "./interface"
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useHistory } from "react-router"
import { useDispatch } from "react-redux"
import { clearSearchResults } from "../../store/search/reducer"
import { API } from "../../API"

//context
import { UserContext as Context } from "../../context"

const MovieCardSmall = ({
  _id,
  Poster,
  imdbID,
  withInfo,
  Title,
  Year,
  Director,
  onMouseEnter,
  onMouseLeave,
  hovered,
  club,
  clubId,
  memberId,
}: IMovieCardSmallProps) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.Title}
    </Tooltip>
  )

  //clubs array context
  const { _filmClubsContext }: any = useContext(Context)
  const { _filmClubs, _setFilmClubs } = _filmClubsContext

  const setSelectedClubFilm = () => {
    API.addSelectedMovieToClub(clubId, memberId, _id)
    dispatch(clearSearchResults())
  }

  return (
    <>
      {!withInfo ? (
        <Col
          className="sm-8  mb-1"
          style={{
            height: "100%",
            transition: "0.2s",
            cursor: "pointer",
            background: `${hovered ? "black" : "transparent"}`,
            border: `5px solid ${hovered ? "green" : "transparent"}`,
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <img
            style={{
              height: "100%",
              borderRadius: "3px",
              transition: "0.2s",
              opacity: `${hovered ? "0.5" : "1"}`,
            }}
            src={Poster}
            onClick={() =>
              club ? setSelectedClubFilm() : history.push(`/film/${imdbID}`)
            }
          />
        </Col>
      ) : (
        <Row className="mt-5">
          <Col xs={12} md={2}>
            <div
              style={{
                width: "90%",
                height: "10vh",
                backgroundColor: "#1c2228",
              }}
            >
              <img
                style={{
                  width: "100%",
                }}
                src={Poster}
                onClick={() => history.push(`/film/${imdbID}`)}
              />
            </div>
          </Col>
          <Col xs={12} md={10} className="info-card-sm">
            <div
              style={{
                height: "10vh",
                backgroundColor: "#1c2228",
              }}
            >
              <span className="d-flex">
                <h5
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push(`/film/${imdbID}`)}
                >
                  {Title}
                </h5>
                <h6>{Year}</h6>
              </span>
              <p>Directed by {Director}</p>
            </div>
          </Col>
        </Row>
      )}
    </>
  )
}

export default MovieCardSmall
