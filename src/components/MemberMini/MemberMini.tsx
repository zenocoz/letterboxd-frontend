import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import { API } from "../../API"
import { IMemberMiniProps } from "./interface"
import "./MemberMini.css"
import { UserContext as Context } from "../../context"
import {
  Form,
  FormControl,
  OverlayTrigger,
  Popover,
  Tooltip,
} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCrown } from "@fortawesome/free-solid-svg-icons"

import { setKeyword, loadSearchResults } from "../../store/search/reducer"
import MovieCardSmall from "../MovieCardSmall/MovieCardSmall"

const MemberMini = (props: any) => {
  const history = useHistory()

  //component state
  const [rating, setRating] = useState(null)
  const [selected, setSelected] = useState(false)
  // const [confirmed, setConfirmed] = useState(false)

  //redux
  const dispatch = useDispatch()

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

  //club id pass it
  const { currentFilmClubContext }: any = useContext(Context)
  const { currentFilmClub, setCurrentFilmClub } = currentFilmClubContext

  const { userInfo } = useSelector((state: any) => state.user)

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

  //Search Bar
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
    // history.push("/search")
  }

  return (
    <div
      className="col-2 friend-info"
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
              {props.member.chooser && (
                <FontAwesomeIcon
                  className="mr-1"
                  icon={faCrown}
                  color={"gold"}
                  size="1x"
                />
              )}

              <img
                src={picture}
                style={{
                  opacity: props.member.confirmed ? "1" : "0.3",
                  width: "2rem",
                  height: "2rem",
                }}
              />
              {props.member.film !== null && (
                <MovieCardSmall
                  {...props.member.film}
                  withInfo={false}
                  // clubId={props.clubId}
                  // memberId={props.member._id}
                />
              )}
              {props.member.confirmed &&
                !props.member.chooser &&
                props.member._id === userInfo._id && (
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
