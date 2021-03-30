import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovie } from "../../../src/store/actionCreators"

//styles
import "./Film.css"

//external dependencies
import { useParams } from "react-router-dom"
import { Row, Col, Jumbotron } from "react-bootstrap"

// import {addMovie} from "./actionCreators"

const Film = () => {
  const { title }: any = useParams() //ANY

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMovie(title))
  }, [title, dispatch])

  const { movie }: any = useSelector((state) => state)

  return (
    <Row>
      <h1>{title}</h1>
      <img src={movie.Poster} style={{ width: "100%" }} />
    </Row>
  )
}

export default Film
