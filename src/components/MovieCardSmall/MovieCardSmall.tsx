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
}: IMovieCardSmallProps) => {
  const history = useHistory()
  return (
    <div>
      {!withInfo ? (
        <div className="col sm-8  mb-4">
          <img
            style={{
              height: "10vh",
            }}
            src={Poster}
            onClick={() => history.push(`/film/${imdbID}`)}
          />
        </div>
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
                width: "100%",
                height: "10vh",
                backgroundColor: "#1c2228",
              }}
            >
              <span className="d-flex">
                <h5>{Title}</h5>
                <h6>{Year}</h6>
              </span>
              <p>Directed by {Director}</p>
            </div>
          </Col>
        </Row>

        /* <Col sm={12} md={2}>
            <div
              style={{
                width: "100%",
                height: "10vh",
                backgroundColor: "#fff",
              }}
            >
              <img
                className="small-card"
                src={Poster}
                onClick={() => history.push(`/film/${imdbID}`)}
              />
            </div>
          </Col>
          <Col sm={12} md={10}>
            {" "}
            <div
              style={{
                width: "100%",
                height: "10vh",
                backgroundColor: "#fff",
              }}
            >
              <span>
                <h5>{Title}</h5>
                <h6>{Year}</h6>
              </span>
            </div>
          </Col> */
      )}
    </div>
  )
}

export default MovieCardSmall
