import { Col } from "react-bootstrap"
import { IMovieCardBigProps } from "./interface"

const MovieCardBig = ({ Poster }: IMovieCardBigProps) => {
  return (
    <Col sm={12} md={3}>
      <div
        className="mb-2"
        style={{
          //   width: "100%",
          height: "40vh",
          backgroundColor: "#848b99",
        }}
      >
        <img
          src={Poster}
          style={{
            width: "40vh",
          }}
        />
      </div>
    </Col>
  )
}

export default MovieCardBig
