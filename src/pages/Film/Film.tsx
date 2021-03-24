import React from "react"

//styles
import "./Film.css"

//external dependencies
import { useParams } from "react-router-dom"
import { Row, Col, Jumbotron } from "react-bootstrap"

const Film = () => {
  const { title }: any = useParams()
  return (
    <Row>
      <h1>{title}</h1>
    </Row>
  )
}

export default Film
