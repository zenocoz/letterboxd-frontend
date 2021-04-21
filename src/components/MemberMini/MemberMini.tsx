import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import { API } from "../../API"
import { IMemberMiniProps } from "./interface"
import "./MemberMini.css"
import { UserContext as Context } from "../../context"

const MemberMini = (props: any) => {
  const history = useHistory()
  const [rating, setRating] = useState(null)
  const [friend, setFriend] = useState({
    username: "",
    picture: "",
    watchedMovies: [],
  })
  const { username, picture, watchedMovies } = friend

  //context
  // const { filmClubProvider }: any = useContext(Context)
  // const { filmClubData, setFilmClubData } = filmClubProvider
  // const { members } = filmClubData

  //context
  const { clubMembersContext }: any = useContext(Context)
  const { clubMembers, setClubMembers } = clubMembersContext

  const [selected, setSelected] = useState(false)
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

  useEffect(() => {
    ;(async () => {
      const friend = await API.getMemberById(props.member._id)
      setFriend({ ...friend })
    })()
  }, [])

  const handleSelected = () => {
    if (selected) {
      const filteredMembers = clubMembers.filter(
        (member: any) => member._id !== props.member._id
      )
      console.log("filtered", filteredMembers)
      setClubMembers(filteredMembers)
      setSelected(false)
    } else {
      setSelected(true)
      clubMembers.push({ _id: props.member._id })
      console.log("members", clubMembers)
      setClubMembers(clubMembers)
    }
  }

  return (
    <div
      className="friend-info"
      style={{ backgroundColor: selected ? "red" : "#05c1f6" }}
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
          <img src={picture} />
          <p
            onClick={() => {
              !props.club
                ? history.push("/user/" + props.member._id)
                : handleSelected()
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
