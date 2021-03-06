//styles and ui frameworks
import { Row, Col, Button, Form, Modal } from "react-bootstrap"
import "./FilmClub.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"

//hooks
import { useEffect, useState, useContext } from "react"
import { useSelector } from "react-redux"
import { useInterval } from "../../custom_hooks"

//context
import { UserContext as Context } from "../../context"

//functions and utils
import { API } from "../../API"
// import { setKeyword, loadSearchResults } from "../../store/search/reducer"

//types and interfaces
// import { IMovie } from "../../interface"

//components
import PopularMembers from "../../components/PopularMembers/PopularMembers"
import PopularMovies from "../../components/PopularMovies/PopularMovies"
import Following from "../../components/Following/Following"
// import { copyFile } from "node:fs"
import MovieCardSmall from "../../components/MovieCardSmall/MovieCardSmall"
import ClubMember from "../../components/ClubMember/ClubMember"
import ClubMovieCard from "../../components/ClubMovieCard/ClubMovieCard"

//external libraries
import isEmpty from "validator/lib/isEmpty"

const FilmClub = () => {
  //state
  const [numberOfClubs, setNumberOfClubs] = useState<any>(0)
  const [unauthorized, setUnauthorized] = useState(false)

  const [show, setShow] = useState(false)

  //redux
  const { movieList } = useSelector((state: any) => state.search)
  const { userInfo, loggedIn } = useSelector((state: any) => state.user)

  //context
  const {
    filmClubContext,
    _filmClubsContext,
    providerModals,
  }: any = useContext(Context)
  const { _filmClubs, _setFilmClubs } = _filmClubsContext

  const { setSignIn } = providerModals.signInModal

  //context variables
  const { filmClubData, setFilmClubData } = filmClubContext
  const { name, members, errorMsg } = filmClubData

  const { currentFilmClubContext }: any = useContext(Context)
  const { currentFilmClub } = currentFilmClubContext

  const handleChange = (e: any) => {
    setFilmClubData({ ...filmClubData, name: e.target.value })
  }
  const handleClubSubmit = (e: any) => {
    e.preventDefault()
    if (isEmpty(name)) {
      setFilmClubData({
        ...filmClubData,
        errorMsg: "You must provide a name for the Film Club",
      })
    } else {
      members.push({
        clubMember: userInfo._id,
        email: userInfo.email,
        confirmed: true,
        chooser: true,
        filmSelected: false,
      })
      setFilmClubData({ ...filmClubData, members })
      API.createClub(filmClubData)
      setFilmClubData({
        name: "",
        members: [],
        films: [],
        watching: false,
        errorMsg: "",
      })
      setNumberOfClubs(_filmClubs.length) //TODO FIX HERE
      setShow(false)
    }
  }

  // check if there are unconfirmed members
  useInterval(async () => {
    if (loggedIn) {
      const response = await API.getUserMovieClubs(userInfo._id)
      if (response) {
        _setFilmClubs(response)
        console.log("interval polled with response", response)
      }
    }
  }, 5000)

  useEffect(() => {
    if (loggedIn) {
      ;(async () => {
        const response = await API.getUserMovieClubs(userInfo._id)
        _setFilmClubs(response)
      })()
    }
  }, [numberOfClubs])

  useEffect(() => {
    if (loggedIn) {
      setNumberOfClubs(_filmClubs.length + 1)
      console.log("number of clubs", numberOfClubs)
    }
  }, [_filmClubs])

  const showModal = () => {
    return (
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ padding: "0 10px" }}
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
                placeholder="Choose a name for the film club"
              />
              {errorMsg && (
                <small className="ml-2 mb-2 mt-0 text-danger text-center">
                  {errorMsg}
                </small>
              )}
            </Form.Group>
          </Form>

          <Form.Group>
            <Form>
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
                errorMsg: "",
              })
            }}
          >
            Cancel
          </Button>
          <Button
            variant="alert"
            onClick={(e) => {
              handleClubSubmit(e)
            }}
          >
            Create Club
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

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
        className="row mt-2 mb-5 d-flex justify-content-between pl-3"
        style={{
          width: "100%",
          minHeight: "12vh",
          backgroundColor: "#14181d",
          color: "#ddd9cb",
          borderRadius: "10px",
          padding: "20px",
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
            clubName={club.name}
          />
        ))}
        {club.watching && (
          <>
            <p>are watching...</p>
            {isChooser(club._id) === true && (
              <>
                <FontAwesomeIcon
                  className="mr-1"
                  icon={faEdit}
                  color={"grey"}
                  size="1x"
                  cursor="pointer"
                  onClick={() => {
                    API.editWatchingMovie(
                      club._id,
                      _filmClubs[c].films[_filmClubs[c].films.length - 1]._id
                    )
                  }}
                />
              </>
            )}

            <div className="ml-2" style={{ height: "5rem", width: "6rem" }}>
              <ClubMovieCard
                {..._filmClubs[c].films[_filmClubs[c].films.length - 1]}
              />
            </div>
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
    setUnauthorized(false)
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      showSearchResults()
    }
  }, [movieList])

  return (
    <>
      <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col style={{ padding: 0 }}>
          <div className="d-flex club-hero mt-2 justify-content-between">
            <h1 className="offset-3">Welcome to the Film Club</h1>
            {showModal()}
            {_filmClubs.length > 0 && (
              <Button
                style={{
                  backgroundColor: "#485794",
                  color: "#ddd9cb",
                  display: "inline-grid",
                }}
                onClick={() =>
                  loggedIn ? setShow(true) : setUnauthorized(true)
                }
              >
                <p style={{ marginBottom: 0 }}>Add a new film club</p>
              </Button>
            )}
          </div>
        </Col>
      </Row>
      <Row className="club-space">
        <Col
          className="d-flex flex-column justify-content-between align-items-center"
          sm={12}
          md={8}
          style={{
            backgroundColor: "#485794",
            borderRadius: "10px",
            paddingTop: "35px",
          }}
        >
          {_filmClubs.length > 0 ? (
            renderFilmClubs()
          ) : (
            <>
              <Button
                style={{
                  backgroundColor: "#ddd9cb",
                  color: "#80231b",
                  display: "inline-grid",
                }}
                onClick={() =>
                  loggedIn ? setShow(true) : setUnauthorized(true)
                }
              >
                <p style={{ marginBottom: 0 }}>Create a film club</p>
                {unauthorized && (
                  <small className="ml-2 mb-2 mt-0 text-danger text-center">
                    <strong
                      onClick={() => {
                        setSignIn(true)
                      }}
                    >
                      log in
                    </strong>{" "}
                    to create a club
                  </small>
                )}
              </Button>

              <p>...invite members you follow...</p>
              <p>...wait for their suggestion...</p>
              <p>...choose the film you want to see together.</p>
              <p>
                ((Coming soon: club editing, calendarization, chat,
                autogenerated zoom link.))
              </p>
            </>
          )}

          <Row style={{ height: "200px" }}>
            {showSearchResults()}
            {/* <HighRatedMovies big={false} limit={4} /> */}
          </Row>
        </Col>
        <Col sm={12} md={4} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className="ml-3">
            <PopularMembers />
          </div>
        </Col>
      </Row>
      <PopularMovies />
    </>
  )
}

export default FilmClub
