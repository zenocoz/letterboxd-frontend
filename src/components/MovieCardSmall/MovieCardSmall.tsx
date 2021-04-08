import React from "react"
import "./MovieCardSmall.css"
import { IMovieCardSmallProps } from "./interface"
import { Col } from "react-bootstrap"
import { useHistory } from "react-router"

const MovieCardSmall = ({ Poster, imdbID }: IMovieCardSmallProps) => {
  const history = useHistory()
  return (
    <div className="col md-8 mb-4 small-card">
      <img src={Poster} onClick={() => history.push(`/film/${imdbID}`)} />
    </div>
  )
}

export default MovieCardSmall
