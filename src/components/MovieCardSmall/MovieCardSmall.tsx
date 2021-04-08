import React from "react"
import "./MovieCardSmall.css"
import { IMovieCardSmallProps } from "./interface"
import { Col } from "react-bootstrap"

const MovieCardSmall = ({ Poster }: IMovieCardSmallProps) => {
  return (
    <div className="col md-8 mb-4 small-card">
      <img src={Poster} />
    </div>
    // <Col>
    //   <img src={Poster} />
    // </Col>
  )
}

export default MovieCardSmall
