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
import { useEffect, useState, useContext } from "react"
import MovieCard from "../../components/MovieCard/MovieCard"
import Following from "../../components/Following/Following"
import { UserContext as Context } from "../../context"

const FilmClub = () => {
  const [show, setShow] = useState(false)
  const [movies, setMovies] = useState<Array<IMovie>>([])

  //context
  const { filmClubContext }: any = useContext(Context)
  const { filmClubData, setFilmClubData } = filmClubContext
  const { name } = filmClubData

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
    setFilmClubData({ ...filmClubData, name: e.target.value })
  }
  const handleClubSubmit = (e: any) => {
    e.preventDefault()
    API.createClub(filmClubData)
    setFilmClubData({ name: "", members: [], films: [] })
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
              <Form.Label>{name}</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                value={name}
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
            variant="danger"
            onClick={() => {
              setShow(false)
              setFilmClubData({ name: "", members: [], films: [] })
            }}
          >
            Cancel
          </Button>
          <Button
            variant="alert"
            onClick={(e) => {
              handleClubSubmit(e)
              setShow(false)
            }}
          >
            Create Club
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
              movies.map((movie: IMovie, i: number) => (
                <Col sm={12} md={3}>
                  {" "}
                  <MovieCard movie={movie} key={i} />
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
