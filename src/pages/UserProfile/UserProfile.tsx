import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { API } from "../../API"
import "./UserProfile.css"

const UserProfile = () => {
  const { _id } = useParams<{ _id: string }>()
  //   const [username, setUsername] = useState<string>("")
  const [userData, setUserData] = useState({
    username: "",
    picture: "",
    watchedMovies: [],
    following: [],
    followers: [],
  })
  const { username, picture, watchedMovies, following, followers } = userData

  useEffect(() => {
    ;(async () => {
      const response = await API.getUser()
      console.log(response)
      setUserData(response)
    })()
  }, [])

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
              <button>edit profile</button>
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
