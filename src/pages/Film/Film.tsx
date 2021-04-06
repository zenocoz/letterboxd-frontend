import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovie } from "../../store/movie/reducer"
// import { API } from "../../API"

//styles
import "./Film.css"

//external dependencies
import { useParams } from "react-router-dom"
import { Row, Col, Jumbotron } from "react-bootstrap"

// import {addMovie} from "./actionCreators"

const Film = () => {
  const { title }: any = useParams() //ANY
  console.log(title)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMovie(title))
  }, [title, dispatch])

  const { Title, Poster, Year, Runtime, Genre, Director } = useSelector(
    (state: any) => state.movie.movieInfo
  )

  return (
    <Row>
      <div className="details-container">
        <h1>{Title}</h1>
        <h2>{Director}</h2>
        <h6>{Year}</h6>
      </div>
      <img src={Poster} style={{ width: "100%" }} />
    </Row>
  )
}

export default Film
