import { useContext } from "react"
import { IMovieCardProps } from "./interface"
import { UserContext } from "../../context"

//external dependencies
import { Card, Col, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

const MovieCard = ({ movie }: IMovieCardProps) => {
  const history = useHistory()
  const { providerValue } = useContext(UserContext)
  const { user } = providerValue

  return (
    <>
      {!user ? (
        <Col className="md-8 mb-4">
          <Card style={{ width: "10rem" }}>
            <Card.Img
              variant="top"
              src={movie.Poster}
              onClick={() => history.push(`/film/${movie.Title}`)}
            />
          </Card>
        </Col>
      ) : (
        <Col>
          <Card style={{ width: "10rem" }}>
            <Card.Img variant="top" src={movie.Poster} />
            {/* //TODO must have an overlay showing friends name and stars or review
            //and title */}
          </Card>
        </Col>
      )}
    </>
  )
}

export default MovieCard
