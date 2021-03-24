import React from "react"
import { IMovieCardProps } from "./interface"
import { Card, Col, Button } from "react-bootstrap"

const MovieCard = (props: IMovieCardProps) => {
  return (
    <>
      {props.loggedIn === false ? (
        <Col className="md-8 mb-4">
          <Card style={{ width: "10rem" }}>
            <Card.Img variant="top" src={props.movie.Poster} />
          </Card>
        </Col>
      ) : (
        <Col>
          <Card style={{ width: "10rem" }}>
            <Card.Img variant="top" src={props.movie.Poster} />
            {/* //TODO must have an overlay showing friends name and stars or review
            //and title */}
          </Card>
        </Col>
      )}
    </>
  )
}

export default MovieCard
