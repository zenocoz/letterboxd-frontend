import {
  Jumbotron,
  Row,
  Col,
  Button,
  Form,
  FormControl,
  Modal,
} from "react-bootstrap"
import PopularMembers from "../../components/PopularMembers/PopularMembers"
import PopularMovies from "../../components/PopularMovies/PopularMovies"
import "./FilmClub.css"
import { IMovie } from "../../interface"
import { API } from "../../API"
import { useEffect, useState } from "react"
import MovieCard from "../../components/MovieCard/MovieCard"
import Following from "../../components/Following/Following"

const FilmClub = () => {
  const [show, setShow] = useState(false)
  const [movies, setMovies] = useState<Array<IMovie>>([])
  const [clubName, setClubName] = useState("")
  const [memberName, setMemberName] = useState("")
  const [filmClubData, setFilmClubData] = useState({
    name: "",
    members: [],
    films: [],
  })

  //placeholder function
  const getMovies = (): void => {
    const imdbIds: Array<string> = [
      "tt0072684",
      "tt0078788",
      "tt0079501",
      "tt0086984",
      //   "tt0076740",
      //   "tt0075612",
    ]
    const retrievedMovies: Array<Promise<IMovie>> = []
    imdbIds.forEach((imdbId) => {
      let movie: Promise<IMovie> = API.getMoviesByImdbId(imdbId)
      retrievedMovies.push(movie)
    })

    Promise.all(retrievedMovies).then((values) => {
      console.log(values)
      setMovies(values)
    })
  }

  const handleChange = (e: any) => {
    setClubName(e.target.value)
  }

  const handleSearch = (e: any) => {}

  const handleSearchSubmit = () => {}

  useEffect(() => {
    getMovies()
  }, [])

  const showModal = () => {
    return (
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>{clubName}</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                value={clubName}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>

          <Form style={{ width: "10rem" }} onSubmit={handleSearchSubmit}>
            <Form.Label>Invite Users</Form.Label>
            <Following club={true} />
            {/* <FormControl
              type="text"
              className="mr-sm-2 search-bar"
              // value={value}
              onChange={handleSearch}
            /> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShow(false)
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <>
      <Row>
        <Col>
          <div className="d-flex club-hero mt-2 justify-content-between">
            <h1 className="offset-3">Welcome to your Film Club</h1>
            {showModal()}
            <Button
              type="primary"
              onClick={() => {
                setShow(true)
              }}
            >
              Create a film club
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={8}>
          <div
            className="mt-2 mb-2"
            style={{
              width: "100%",
              height: "8vh",
              backgroundColor: "#89249c",
            }}
          >
            your film club #
          </div>
          <div
            className="mt-2 mb-2"
            style={{
              width: "100%",
              height: "8vh",
              backgroundColor: "#89249c",
            }}
          >
            your film club #
          </div>
          <div
            className="mt-2 mb-2"
            style={{
              width: "100%",
              height: "8vh",
              backgroundColor: "#89249c",
            }}
          >
            your film club #
          </div>
          <Row>
            {movies.length > 0 &&
              movies.map((movie: IMovie) => (
                <Col sm={12} md={3}>
                  {" "}
                  <MovieCard movie={movie} key={movie.imdbID} />
                </Col>
              ))}
          </Row>
        </Col>
        <Col sm={12} md={4}>
          {/* <Form style={{ width: "10rem" }} onSubmit={handleSubmit}>
            <Form.Label>Search Users</Form.Label>
            <FormControl
              type="text"
              className="mr-sm-2 search-bar"
              // value={value}
              onChange={handleSearch}
            />
          </Form> */}
          <PopularMembers />
        </Col>
      </Row>
      <Row>
        <Col>
          <PopularMovies />
        </Col>
      </Row>
    </>
  )
}

export default FilmClub
