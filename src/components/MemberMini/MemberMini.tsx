import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import { API } from "../../API"
import { IMemberMiniProps } from "./interface"
import "./MemberMini.css"
import { UserContext as Context } from "../../context"
import { Form, FormControl, OverlayTrigger, Popover } from "react-bootstrap"

const MemberMini = (props: any) => {
  const history = useHistory()
  const [rating, setRating] = useState(null)
  const [selected, setSelected] = useState(false)
  // const [confirmed, setConfirmed] = useState(false)

  const [friend, setFriend] = useState({
    username: "",
    picture: "",
    email: "",
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
      setFilmClubData({
        ...filmClubData,
        members: filteredMembers,
      })
      setSelected(false)
    } else {
      setSelected(true)
      members.push({
        _id: props.member._id,
        email: friend.email,
        confirmed: false,
        chooser: false,
      })
      setFilmClubData({ ...filmClubData, members })
    }
  }

  const handleSearch = (e: any) => {}

  const handleSearchSubmit = () => {}

  return (
    <div
      className="col friend-info"
      style={{ backgroundColor: selected ? "red" : "#14181d" }}
    >
      {props.withInfo ? (
        <>
          <img src={picture} style={{ width: "5rem", height: "5rem" }} />
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
            <>
              <img
                src={picture}
                style={{
                  opacity: props.member.confirmed ? "1" : "0.3",
                  width: "2rem",
                  height: "2rem",
                }}
              />
              {props.member.confirmed && !props.member.chooser && (
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
              )}
            </>
          ) : (
            <img src={picture} style={{ width: "3rem", height: "3rem" }} />
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
