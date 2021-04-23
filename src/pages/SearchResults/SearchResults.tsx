import React from "react"

import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import "./SearchResults.css"
import { Row, Col, ListGroup } from "react-bootstrap"
import MovieCardSmall from "../../components/MovieCardSmall/MovieCardSmall"
import PopularReviews from "../../components/PopularReviews/PopularReviews"

const SearchResults = () => {
  // const history = useHistory()
  const { movieList } = useSelector((state: any) => state.search)

  return (
    <>
      <Row>
        <Col xs={12} md={8}>
          {movieList.length > 0 &&
            movieList.map((movie: any) => (
              <MovieCardSmall {...movie} withInfo={true} />
            ))}
        </Col>
        <Col xs={12} md={4}>
          <PopularReviews />
          {/* <ListGroup as="ul">
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
          </ListGroup> */}
        </Col>
      </Row>
    </>
  )
}

export default SearchResults
