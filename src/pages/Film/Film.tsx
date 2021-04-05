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

  //WORKS PROTOTYPE
  // function getData(query: string) {
  //   return (dispatch: any) => {
  //     API.getMoviesByTitle(query)
  //       .then((res) =>
  //         dispatch({
  //           type: "ADD_MOVIE",
  //           payload: res,
  //         })
  //       )
  //       .catch((err) => console.log(err))
  //   }
  // }

  useEffect(() => {
    dispatch(getMovie(title))
  }, [title, dispatch])

  const { Title, Poster, Year, Runtime, Genre, Director } = useSelector(
    (state: any) => state.movie
  )

  return (
    <Row>
      <h1>{title}</h1>
      <img src={Poster} style={{ width: "100%" }} />
    </Row>
  )
}

export default Film
