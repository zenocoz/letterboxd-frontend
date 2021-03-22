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
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={props.movie.Poster} />
            <Card.Body>
              <Card.Title>{props.movie.Title}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      )}
    </>
  )
}

export default MovieCard
