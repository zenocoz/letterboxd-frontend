import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { API } from "../../API"
import "./UserProfile.css"
import { useUserInfo } from "../../custom_hooks"

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

  const actions = useUserInfo(userInfo._id, userId)

  const checkFollowing = () => {
    const member = userInfo.following.find(
      (member: any) => member._id === userId
    )
    if (member) {
      setIsFollowed(true)
    } else {
      setIsFollowed(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      console.log(userId)
      const response = await API.getMemberById(userId)
      // console.log("TOTAl WATCHED", response.totalWatched) // TODO optimize to make other array length come from BE
      setMemberData(response)
    })()
  }, [])

  useEffect(() => {
    checkFollowing()
  }, [userInfo.following])

  //TODO
  const changePicture = () => {}

  return (
    <>
      <div
        className="row container-fluid"
        style={{ backgroundColor: "yellow", paddingRight: "!important 0" }}
      >
        <div className="col-4 sm-12 md-8">
          <div className="user-info d-flex">
            <div style={{ height: "10vh", width: "30%" }}>
              {" "}
              <img id="avatar" src={picture} alt="userImage" />
            </div>
            <p>
              <p>{username}</p>
              {!loggedIn ? (
                <div></div>
              ) : userInfo._id === userId ? (
                <button>edit profile</button>
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
    </>
  )
}

export default UserProfile
