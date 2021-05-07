import React, { useState, useEffect, useContext } from "react"
import { API } from "../../API"
import { setKeyword, loadSearchResults } from "../../store/search/reducer"
import { useSelector, useDispatch } from "react-redux"
import { Form, FormControl, Modal, Button } from "react-bootstrap"
import { UserContext as Context } from "../../context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faCrown, faTrash } from "@fortawesome/free-solid-svg-icons"
import ClubMovieCard from "../ClubMovieCard/ClubMovieCard"

const ClubMember = (props: any) => {
  //state
  const [clubFriend, setClubFriend] = useState({
    username: "",
    picture: "",
    email: "",
  })
  const { username, picture } = clubFriend

  const [showSearchBar, setShowSearchBar] = useState(false)
  const [showDeleteClubModal, setShowDeleteClubModal] = useState(false)

  //context
  const { currentFilmClubContext }: any = useContext(Context)
  const { setCurrentFilmClub } = currentFilmClubContext

  //redux
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: any) => state.user)

  //film club search bar
  const [value, setSearchValue] = useState("")
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  const handleSearchSubmit = async (e: any) => {
    e.preventDefault()
    dispatch(setKeyword(value))
    dispatch(loadSearchResults(value))
    setSearchValue("")
    setCurrentFilmClub(props.clubId)
    setShowSearchBar(false)
    // history.push("/search")
  }

  const renderSearchBar = () => {
    return (
      <Form onSubmit={handleSearchSubmit}>
        <FormControl
          type="text"
          className="mr-sm-2 search-bar"
          // value={value}
          style={{
            height: "2rem",
            width: "10rem",
            position: "absolute",
            marginTop: "3rem",
          }}
          onChange={handleSearch}
        />
      </Form>
    )
  }

  useEffect(() => {
    ;(async () => {
      const friend = await API.getMemberById(props.member.clubMember)
      setClubFriend({ ...friend })
    })()
  }, [])

  return (
    <>
      {!props.watching ? (
        <div className="col-3 justify-content-center py-3">
          <div className="d-flex">
            {props.member.confirmed &&
              !props.member.chooser &&
              props.member.clubMember === userInfo._id && (
                <FontAwesomeIcon
                  className="mr-1"
                  icon={faPlus}
                  color={"grey"}
                  size="1x"
                  onClick={() => {
                    setShowSearchBar(!showSearchBar)
                  }}
                />
              )}
            <img
              src={picture}
              alt=""
              style={{
                opacity: props.member.confirmed ? "1" : "0.3",
                width: "2rem",
                height: "2rem",
                borderRadius: "50px",
              }}
            />

            {props.member.chooser && (
              <div className="ml-2">
                <FontAwesomeIcon
                  className="ml-2 mr-2"
                  icon={faCrown}
                  color={"gold"}
                  size="1x"
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  color={"red"}
                  size="1x"
                  cursor="pointer"
                  onClick={() => {
                    setShowDeleteClubModal(true)
                  }}
                />
                <Modal
                  dialogClassName="modal-50w"
                  onHide={() => setShowDeleteClubModal(false)}
                  show={showDeleteClubModal}
                  style={{
                    height: "200px",
                    position: "absolute",
                    top: "14rem",
                    left: "22rem",
                    padding: 0,
                  }}
                >
                  <Modal.Body style={{ padding: "0.50rem", fontSize: "small" }}>
                    <p>
                      Are you sure you want to delete this film club. The
                      operation is irreversible
                    </p>
                  </Modal.Body>

                  <Modal.Footer style={{ padding: 0 }}>
                    <Button
                      style={{ padding: 0, fontSize: "small" }}
                      variant="danger"
                    >
                      delete
                    </Button>
                    <Button
                      style={{ padding: 0, fontSize: "small" }}
                      variant="primary"
                      onClick={() => {
                        setShowDeleteClubModal(false)
                      }}
                    >
                      cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            )}

            {props.member.film !== null && (
              <div className="ml-2" style={{ height: "5rem", width: "6rem" }}>
                <ClubMovieCard {...props.member.film} clubId={props.clubId} />
              </div>
            )}
          </div>

          <p>{username}</p>

          <div>{showSearchBar && renderSearchBar()}</div>
        </div>
      ) : (
        <div className="col-2 ">
          <img
            src={picture}
            alt=""
            style={{
              // opacity: props.member.confirmed ? "1" : "0.3",
              width: "2rem",
              height: "2rem",
              borderRadius: "50px",
            }}
          />

          <p>{username}</p>
        </div>
      )}
    </>
  )
}

export default ClubMember
