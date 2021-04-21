import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import { API } from "../../API"
import { IMemberMiniProps } from "./interface"
import "./MemberMini.css"
import { UserContext as Context } from "../../context"

const MemberMini = (props: any) => {
  const history = useHistory()
  const [rating, setRating] = useState(null)
  const [selected, setSelected] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const [friend, setFriend] = useState({
    username: "",
    picture: "",
    watchedMovies: [],
  })
  const { username, picture, watchedMovies } = friend

  //context
  const { filmClubContext }: any = useContext(Context)
  const { filmClubData, setFilmClubData } = filmClubContext
  const { members } = filmClubData

  useEffect(() => {
    if (watchedMovies.length > 0) {
      const movie: any = watchedMovies.find(
        (movie: any) => movie._id === props.movieId
      )
      if (movie) {
        setRating(movie.rating)
      }
    }
  }, [username])

  useEffect(() => {
    ;(async () => {
      const friend = await API.getMemberById(props.member._id)
      setFriend({ ...friend })
    })()
  }, [])

  const handleSelected = () => {
    if (selected) {
      const filteredMembers = members.filter(
        (member: any) => member._id !== props.member._id
      )
      setFilmClubData({ ...filmClubData, members: filteredMembers })
      setSelected(false)
    } else {
      setSelected(true)
      members.push({ _id: props.member._id })
      setFilmClubData({ ...filmClubData, members })
    }
  }

  return (
    <div
      className="friend-info"
      style={{ backgroundColor: selected ? "red" : "#05c1f6", height: "100%" }}
    >
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
          {props.essential ? (
            <img src={picture} style={{ opacity: confirmed ? "1" : "0.3" }} />
          ) : (
            <img src={picture} />
          )}
          <p
            onClick={() => {
              !props.club
                ? history.push("/user/" + props.member._id)
                : handleSelected()
            }}
            style={{ cursor: props.essential ? "auto" : "pointer" }}
          >
            {username}
          </p>
          {!props.essential && <p>{watchedMovies.length} films </p>}
        </>
      )}
    </div>
  )
}

export default MemberMini
