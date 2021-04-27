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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

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
import ClubMember from "../../components/ClubMember/ClubMember"
import ClubMovieCard from "../../components/ClubMovieCard/ClubMovieCard"

const FilmClub = () => {
  const [numberOfClubs, setNumberOfClubs] = useState<any>(0)
  // const watching = false

  const [show, setShow] = useState(false)
  // const [movies, setMovies] = useState<Array<IMovie>>([])
  // const [filmClubs, setFilmClubs] = useState<any>([])

  //redux
  // const dispatch = useDispatch()
  const { movieList } = useSelector((state: any) => state.search)
  const { userInfo, loggedIn } = useSelector((state: any) => state.user)

  //context
  const { filmClubContext }: any = useContext(Context)
  const { filmClubData, setFilmClubData } = filmClubContext
  const { name, members } = filmClubData

  //clubs array context
  const { _filmClubsContext }: any = useContext(Context)
  const { _filmClubs, _setFilmClubs } = _filmClubsContext

  //current film club context
  //probably not needed

  const { currentFilmClubContext }: any = useContext(Context)
  const { currentFilmClub } = currentFilmClubContext

  const handleChange = (e: any) => {
    setFilmClubData({ ...filmClubData, name: e.target.value })
  }
  const handleClubSubmit = (e: any) => {
    e.preventDefault()
    members.push({
      clubMember: userInfo._id,
      email: userInfo.email,
      confirmed: true,
      chooser: true,
      filmSelected: false,
    })
    setFilmClubData({ ...filmClubData, members })
    API.createClub(filmClubData)
    setFilmClubData({ name: "", members: [], films: [], watching: false })
    setNumberOfClubs(_filmClubs.length) //TODO FIX HERE
  }

  // check if there are unconfirmed members
  useInterval(async () => {
    const response = await API.getUserMovieClubs(userInfo._id)
    if (response) {
      _setFilmClubs(response)
      console.log("interval polled with response", response)
    }
  }, 1000)

  useEffect(() => {
    if (loggedIn) {
      ;(async () => {
        const response = await API.getUserMovieClubs(userInfo._id)
        _setFilmClubs(response)
      })()
    }
  }, [numberOfClubs])

  useEffect(() => {
    setNumberOfClubs(_filmClubs.length + 1)
    console.log("number of clubs", numberOfClubs)
  }, [_filmClubs])

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

          <Form.Group>
            <Form style={{ width: "10rem" }}>
              <Form.Label>Invite Users</Form.Label>
              <Following club={true} withInfo={false} />
            </Form>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setShow(false)
              setFilmClubData({
                name: "",
                members: [],
                films: [],
                watching: false,
              })
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

  // find if current member is user //TODO Refactor

  const isChooser = (clubId: string) => {
    const currentClub = _filmClubs.find((club: any) => club._id === clubId)
    if (currentClub) {
      const currentMember = currentClub.members.find(
        (member: any) => member.clubMember === userInfo._id
      )
      console.log("current member", currentMember.email)
      if (currentMember.chooser) {
        console.log("current member is chooser")
        return true
      } else {
        console.log("current member is NOT chooser")
        return false
      }
    }
  }

  const renderFilmClubs = () => {
    return _filmClubs.map((club: any, c: number) => (
      <div
        className="row mt-2 mb-5 d-flex justify-content-between"
        style={{
          width: "100%",
          height: "12vh",
          backgroundColor: "#14181d",
          color: "#ddd9cb",
          // backgroundColor: "#89249c",
        }}
      >
        {club.name}
        {club.members.map((member: any, i: number) => (
          <ClubMember
            member={member}
            key={i}
            clubId={club._id}
            watching={club.watching}
          />
        ))}
        {club.watching && (
          <>
            <p>are watching...</p>
            {isChooser(club._id) === true && (
              <FontAwesomeIcon
                className="mr-1"
                icon={faEdit}
                color={"red"}
                size="1x"
                cursor="pointer"
                onClick={() => {
                  API.editWatchingMovie(
                    club._id,
                    _filmClubs[c].films[_filmClubs[c].films.length - 1]._id
                  )
                }}
              />
            )}

            <ClubMovieCard
              {..._filmClubs[c].films[_filmClubs[c].films.length - 1]}
            />
          </>
        )}
      </div>
    ))
  }

  const showSearchResults = () => {
    return (
      <>
        {movieList && movieList.length > 0 ? (
          movieList.map((movie: any) => (
            <MovieCardSmall
              {...movie}
              withInfo={false}
              club={true}
              clubId={currentFilmClub}
              memberId={userInfo._id}
            />
          ))
        ) : (
          <div></div>
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
        <Col style={{ padding: 0 }}>
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
      <Row style={{ height: "75vh", marginTop: "3rem" }}>
        <Col
          className="d-flex flex-column justify-content-between "
          sm={12}
          md={8}
          style={{ backgroundColor: "#485794" }}
        >
          {_filmClubs.length > 0 && renderFilmClubs()}

          <Row style={{ height: "200px" }}>
            {showSearchResults()}
            {/* <HighRatedMovies big={false} limit={4} /> */}
          </Row>
        </Col>
        <Col sm={12} md={4}>
          <div className="ml-3">
            <PopularMembers />
          </div>
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
