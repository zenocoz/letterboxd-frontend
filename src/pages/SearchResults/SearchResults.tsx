import React from "react"

import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import "./SearchResults.css"
import { Row, Col, ListGroup } from "react-bootstrap"

const SearchResults = () => {
  const history = useHistory()
  const { movieList } = useSelector((state: any) => state.search)

  return (
    <p>
      <Row>
        <Col xs={12} md={8}>
          <ListGroup>
            <Row className="mb-3">
              <Col xs={12} md={2}>
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
              <Col xs={12} md={10}>
                {" "}
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={2}>
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
              <Col xs={12} md={10}>
                {" "}
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={2}>
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
              <Col xs={12} md={10}>
                {" "}
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
            </Row>
          </ListGroup>
          <ListGroup>
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
              <Col xs={12} md={8}>
                {" "}
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
              <Col xs={12} md={8}>
                {" "}
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
              <Col xs={12} md={8}>
                {" "}
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
              <Col xs={12} md={8}>
                {" "}
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
              <Col xs={12} md={8}>
                {" "}
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
              <Col xs={12} md={8}>
                {" "}
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
              <Col xs={12} md={8}>
                {" "}
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
              <Col xs={12} md={8}>
                {" "}
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
              <Col xs={12} md={8}>
                {" "}
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
              <Col xs={12} md={8}>
                {" "}
                <div
                  style={{
                    width: "100%",
                    height: "10vh",
                    backgroundColor: "#fff",
                  }}
                ></div>
              </Col>
            </Row>
          </ListGroup>
        </Col>
        <Col xs={12} md={4}>
          <ListGroup as="ul">
            <div
              className="mb-1"
              style={{
                width: "100%",
                height: "5vh",
                backgroundColor: "#fff",
              }}
            ></div>
            <div
              className="mb-1"
              style={{
                width: "100%",
                height: "5vh",
                backgroundColor: "#fff",
              }}
            ></div>
            <div
              className="mb-1"
              style={{
                width: "100%",
                height: "5vh",
                backgroundColor: "#fff",
              }}
            ></div>
            <div
              className="mb-1"
              style={{
                width: "100%",
                height: "5vh",
                backgroundColor: "#fff",
              }}
            ></div>
            <div
              className="mb-1"
              style={{
                width: "100%",
                height: "5vh",
                backgroundColor: "#fff",
              }}
            ></div>
            <div
              className="mb-1"
              style={{
                width: "100%",
                height: "5vh",
                backgroundColor: "#fff",
              }}
            ></div>
            <div
              className="mb-1"
              style={{
                width: "100%",
                height: "5vh",
                backgroundColor: "#fff",
              }}
            ></div>
            <div
              className="mb-1"
              style={{
                width: "100%",
                height: "5vh",
                backgroundColor: "#fff",
              }}
            ></div>
          </ListGroup>
        </Col>
      </Row>

      {/* // <div className="results">
      //   <ul>
      //     {movieList.length > 0 &&
      //       movieList.map((movie: any) => (
      //         <li
      //           onClick={() => {
      //             history.push(`/film/${movie.imdbID}`)
      //           }}
      //         >
      //           {movie.Title}
      //         </li>
      //       ))}
      //   </ul>
      // </div> */}

      <Row>
        <ListGroup>
          {movieList.length > 0 &&
            movieList.map((movie: any) => (
              <li
                className="mb-1"
                style={{
                  width: "100%",
                  height: "5vh",
                  backgroundColor: "red",
                }}
                onClick={() => {
                  history.push(`/film/${movie.imdbID}`)
                }}
              >
                {movie.Title}
              </li>
            ))}
        </ListGroup>
      </Row>
    </p>
  )
}

export default SearchResults
