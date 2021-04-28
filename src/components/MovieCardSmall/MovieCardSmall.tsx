import React, { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
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

  //clubs array context
  const { _filmClubsContext }: any = useContext(Context)
  const { _filmClubs, _setFilmClubs } = _filmClubsContext

  const setSelectedClubFilm = () => {
    console.log("member", memberId)
    API.addSelectedMovieToClub(clubId, memberId, _id)
    dispatch(clearSearchResults())
  }

  return (
    <>
      {!withInfo ? (
        <div
          className=" sm-8  mb-1"
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
        </div>
      ) : (
        <Row className="mt-5">
          <div
            className="col xs-12 md-2"
            style={{
              width: "90%",
              minHeight: "15vh",
              backgroundColor: "#1c2228",
              borderRadius: "3px",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "3px",
              }}
              src={Poster}
              onClick={() => history.push(`/film/${imdbID}`)}
            />
          </div>

          <Col xs={12} md={10} className="info-card-sm">
            <div
              style={{
                height: "10vh",
                backgroundColor: "#1c2228",
                paddingTop: "5px",
                paddingLeft: "10px",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex">
                <h5
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push(`/film/${imdbID}`)}
                >
                  {Title}
                </h5>
                <h6>{Year}</h6>
              </div>
              <p>Directed by {Director}</p>
            </div>
          </Col>
        </Row>
      )}
    </>
  )
}

export default MovieCardSmall
