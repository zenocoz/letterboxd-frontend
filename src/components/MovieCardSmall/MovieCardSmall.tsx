import React from "react"
import "./MovieCardSmall.css"
import { IMovieCardSmallProps } from "./interface"
import { Col, Row } from "react-bootstrap"
import { useHistory } from "react-router"

const MovieCardSmall = ({
  Poster,
  imdbID,
  withInfo,
  Title,
  Year,
  Director,
  onMouseEnter,
  onMouseLeave,
  hovered,
}: IMovieCardSmallProps) => {
  const history = useHistory()
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
            onClick={() => history.push(`/film/${imdbID}`)}
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
