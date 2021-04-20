import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { API } from "../../API"
import { IMemberMiniProps } from "./interface"
import "./MemberMini.css"

const MemberMini = (props: any) => {
  const history = useHistory()
  const [rating, setRating] = useState(null)
  const [friend, setFriend] = useState({
    username: "",
    picture: "",
    watchedMovies: [],
  })
  const { username, picture, watchedMovies } = friend

  useEffect(() => {
    if (watchedMovies.length > 0) {
      const movie: any = watchedMovies.find(
        (movie: any) => movie._id === props.movieId
      )
      if (movie) {
        setRating(movie.rating)
      }
    }
    console.log(rating)
    console.log("watchedMovies", watchedMovies)
  }, [username])

  // const friends: Promise<IUser>[] = []
  // friendsWhoSawMovie.forEach((member: any) => {
  //   let friend: Promise<IUser> = API.getMemberById(member._id)
  //   friends.push(friend)
  // })
  // Promise.all(friends).then((values) => {
  //   console.log("VALUES", values)
  //   setFriendsWhoSawMovie(values)
  // })

  useEffect(() => {
    ;(async () => {
      const friend = await API.getMemberById(props.member._id)
      setFriend({ ...friend })
    })()
  }, [])

  return (
    <div className="friend-info">
      {props.withInfo ? (
        <>
          <img src={picture} />
          <p
            onClick={() => {
              history.push("/user/" + props.member._id)
            }}
            style={{ cursor: "pointer" }}
          >
            {username}
          </p>
          <p className="d-flex">
            <p>stars</p>
            <p>{rating && rating}</p>
          </p>
        </>
      ) : (
        <>
          <img src={picture} />
          <p
            onClick={() => {
              history.push("/user/" + props.member._id)
            }}
            style={{ cursor: "pointer" }}
          >
            {username}
          </p>
          <p>{watchedMovies.length} films </p>
        </>
      )}
    </div>
  )
}

export default MemberMini
