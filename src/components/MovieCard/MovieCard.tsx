//redux and hooks
import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useMovieStatus } from "../../custom_hooks"

import { IMovieCardProps } from "./interface"
// import { UserContext } from "../../context"
import { API } from "../../API"
import { checkViews } from "../../utils"

//external libraries
import { Card, Col } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faStar, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

//style
import "./MovieCard.css"

const MovieCard = (props: any) => {
  const history = useHistory()
  const [wasSeen, setWasSeen] = useState(false)

  const { loggedIn, userInfo } = useSelector((state: any) => state.user)

  // const actions = useMovieStatus(userInfo._id, movie._id, movie.imdbID)

  // useEffect(() => {
  //   if (loggedIn) {
  //     let movieChecked: boolean = checkViews(movie.seenBy, userInfo._id)
  //     if (movieChecked === true) {
  //       setWasSeen(true)
  //     } else {
  //       setWasSeen(false)
  //     }
  //   }
  // }, [loggedIn, actions])

  const width = 200
  const height = 300
  const { movie, actions = [] } = props

  return (
    <Col
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      style={{
        width,
        height,
        transition: "0.2s",
        cursor: "pointer",
        background: `${props.hovered ? "black" : "transparent"}`,
        border: `8px solid ${props.hovered ? "green" : "transparent"}`,
      }}
    >
      <img
        style={{
          width,
          height,
          transition: "0.2s",
          opacity: `${props.hovered ? "0.5" : "1"}`,
        }}
        alt="batman"
        src={movie.Poster}
      />
      <div
        style={{
          display: props.hovered ? "flex" : "none",
          justifyContent: "space-evenly",
          width: "100%",
          position: "relative",
          bottom: "15%",
          backgroundColor: "black",
          color: "#fff",
        }}
      >
        {actions.map((action: any) => (
          <span onClick={action.handler}>{action.icon}</span>
        ))}
      </div>
    </Col>
  )
}

export default MovieCard
