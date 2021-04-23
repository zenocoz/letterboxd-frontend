//styles and ui frameworks
import {
  Jumbotron,
  Row,
  Col,
  Button,
  Form,
  FormControl,
  Modal,
} from "react-bootstrap"
import "./FilmClub.css"

//hooks
import { useEffect, useState, useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useInterval } from "../../custom_hooks"

//context
import { UserContext as Context } from "../../context"

//functions and utils
import { API } from "../../API"
// import { setKeyword, loadSearchResults } from "../../store/search/reducer"

//types and interfaces
import { IMovie } from "../../interface"

//components
import PopularMembers from "../../components/PopularMembers/PopularMembers"
import PopularMovies from "../../components/PopularMovies/PopularMovies"
import MovieCard from "../../components/MovieCard/MovieCard"
import MemberMini from "../../components/MemberMini/MemberMini"
import Following from "../../components/Following/Following"
import { copyFile } from "node:fs"
import HighRatedMovies from "../../components/HighRatedMovies/HighRatedMovies"
import MovieCardSmall from "../../components/MovieCardSmall/MovieCardSmall"

const FilmClub = () => {
  const [numberOfClubs, setNumberOfClubs] = useState<any>(0)

  const [show, setShow] = useState(false)
  const [movies, setMovies] = useState<Array<IMovie>>([])
  const [filmClubs, setFilmClubs] = useState<any>([])

  //redux
  // const dispatch = useDispatch()
  const { movieList } = useSelector((state: any) => state.search)
  const { userInfo, loggedIn } = useSelector((state: any) => state.user)

  //context
  const { filmClubContext }: any = useContext(Context)
  const { filmClubData, setFilmClubData } = filmClubContext
  const { name, members } = filmClubData

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
    members.push({
      _id: userInfo._id,
      email: userInfo.email,
      confirmed: true,
      chooser: true,
    })
    setFilmClubData({ ...filmClubData, members })
    API.createClub(filmClubData)
    setFilmClubData({ name: "", members: [], films: [] })
    setNumberOfClubs(filmClubs.length)
  }

  // //Search Bar
  // const [value, setSearchValue] = useState("")
  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchValue(e.target.value)
  // }
  // const handleSearchSubmit = async (e: any) => {
  //   e.preventDefault()
  //   dispatch(setKeyword(value))
  //   dispatch(loadSearchResults(value))
  //   setSearchValue("")
  //   // history.push("/search")
  // }

  //check if there are unconfirmed members
  useInterval(async () => {
    const response = await API.getUserMovieClubs(userInfo._id)
    if (response) {
      setFilmClubs(response)
      console.log("interval polled")
    }
  }, 5000)

  useEffect(() => {
    if (loggedIn) {
      ;(async () => {
        const response = await API.getUserMovieClubs(userInfo._id)
        if (response) {
          setFilmClubs(response)
        }
      })()
    }
  }, [numberOfClubs])

  useEffect(() => {
    getMovies()
  }, [])

  useEffect(() => {
    setNumberOfClubs(filmClubs.length + 1)
    console.log("number of clubs", numberOfClubs)
  }, [filmClubs])

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

          <Form style={{ width: "10rem" }}>
            <Form.Label>Invite Users</Form.Label>
            <Following club={true} withInfo={false} />
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

  const renderFilmClubs = () => {
    return filmClubs.map((club: any) => (
      <div
        className="row mt-2 mb-5 d-flex justify-content-between"
        style={{
          width: "100%",
          height: "8vh",
          backgroundColor: "#14181d",
          color: "#ddd9cb",
          // backgroundColor: "#89249c",
        }}
      >
        {club.name}
        {club.members.map((member: any, i: number) => (
          <MemberMini
            member={member}
            withInfo={false}
            key={i}
            club={true}
            essential={true}
          />
        ))}
      </div>
    ))
  }

  const showSearchResults = () => {
    return (
      <>
        {movieList.length > 0 ? (
          movieList.map((movie: any) => (
            <MovieCardSmall {...movie} withInfo={false} />
          ))
        ) : (
          <div>null</div>
        )}
      </>
    )
  }

  useEffect(() => {
    showSearchResults()
  }, [movieList])

  return (
    <>
      <Row>
        <Col>
          <div className="d-flex club-hero mt-2 justify-content-between">
            <h1 className="offset-3">Welcome to the Film Club</h1>
            {showModal()}
            <Button
              style={{ backgroundColor: "#485794", color: "#ddd9cb" }}
              onClick={() => {
                setShow(true)
              }}
            >
              Create a film club
            </Button>
          </div>
        </Col>
      </Row>
      <Row style={{ height: "75vh" }}>
        <Col
          className="d-flex flex-column justify-content-between"
          sm={12}
          md={8}
          style={{ backgroundColor: "#485794" }}
        >
          {filmClubs.length > 0 && renderFilmClubs()}

          <Row style={{ height: "200px" }}>
            {showSearchResults()}
            {/* <HighRatedMovies big={false} limit={4} /> */}
          </Row>
        </Col>
        <Col sm={12} md={4}>
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
