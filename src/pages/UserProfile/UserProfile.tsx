import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { API } from "../../API"
import "./UserProfile.css"
import { useFollow } from "../../custom_hooks"
import { Modal, Button } from "react-bootstrap"

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>()
  const [memberData, setMemberData] = useState({
    username: "",
    picture: "",
    watchedMovies: [],
    following: [],
    followers: [],
  })

  const { username, picture, watchedMovies, following, followers } = memberData

  const { loggedIn, userInfo } = useSelector((state: any) => state.user)
  const [isFollowed, setIsFollowed] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)

  const [showPictureModal, setShowPictureModal] = useState(false)

  const actions = useFollow(userId)

  //given changes to db, members array in redux is simply id strings, so member and not member._id
  const checkFollowing = () => {
    const member = userInfo.following.find((member: any) => member === userId)
    if (member) {
      setIsFollowed(true)
    } else {
      setIsFollowed(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      const response = await API.getMemberById(userId)
      setMemberData(response)
    })()
  }, [isUpdated])

  useEffect(() => {
    if (loggedIn) {
      checkFollowing()
    }
  }, [userInfo])

  const updateImage = async () => {
    const input: any = document.querySelector('input[type="file"]')

    const formData = new FormData()
    formData.append("picture", input.files[0])

    const response = await API.updateProfilePicture(userId, formData)
    if (response) {
      console.log("profile image posted succesfully")
      setIsUpdated(!isUpdated)

      setShowPictureModal(false)
    } else {
      const error = response.errors
      console.log(error)
    }
  }

  const pictureModal = () => {
    return (
      <Modal
        show={showPictureModal}
        backdrop="static"
        keyboard={false}
        // onHide={setIsUpdated(!isUpdated)}
      >
        <Modal.Header>
          <Modal.Title>Post Profile Picture Here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPictureModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={updateImage}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <>
      <div
        className="row container-fluid"
        style={{ backgroundColor: "#14181d", paddingRight: "!important 0" }}
      >
        <div className="col-4 sm-12 md-8">
          <div className="user-info d-flex">
            <div
              style={{
                height: "5rem",
                width: "5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "1em",
              }}
            >
              {" "}
              <img
                id="avatar"
                src={picture}
                alt="userImage"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50px",
                }}
              />
            </div>
            <p>
              <p>{username}</p>
              {!loggedIn ? (
                <div></div>
              ) : userInfo._id === userId ? (
                <button
                  onClick={() => {
                    setShowPictureModal(true)
                  }}
                >
                  edit profile
                </button>
              ) : isFollowed ? (
                <button
                  onClick={() => {
                    actions.unfollow()
                  }}
                >
                  unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    actions.follow()
                  }}
                >
                  follow
                </button>
              )}
            </p>
          </div>
        </div>
        <div className="col-8 sm-12 md-8 ">
          <div className="social-data">
            <div>
              <p>Watched Movies </p>
              <p>{watchedMovies.length}</p>
            </div>
            <div>
              <p> Following </p>
              <p>{following.length}</p>
            </div>
            <div>
              <p>Followers</p>
              <p>{followers.length}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col sm-12 md-8"></div>
      </div>
      {showPictureModal && pictureModal()}
    </>
  )
}

export default UserProfile
