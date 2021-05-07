//redux and hooks
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useMovieStatus } from "../../custom_hooks"

// import { IMovieCardProps } from "./interface"
import { checkUserViews } from "../../utils"

//external libraries
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { OverlayTrigger, Tooltip } from "react-bootstrap"

//style
import "./MovieCard.css"

const MovieCard = (props: any) => {
  const { movie, loggedIn = [] } = props

  const history = useHistory()

  const { userInfo } = useSelector((state: any) => state.user)
  const movieAction = useMovieStatus(props.movie._id, props.movie.imdbID)
  const [movieSeen, setMovieSeen] = useState<any>(false)

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {movie.Title} ({movie.Year})
    </Tooltip>
  )

  // function like(i: number) {
  //   alert(`Liked movie is }`)
  // }

  useEffect(() => {
    if (loggedIn) {
      setMovieSeen(checkUserViews(userInfo.watchedMovies, movie._id))
    }
  }, [userInfo])

  const actions = [
    // {
    //   icon: "❤️",
    //   handler: () => like(1),
    // },
    {
      icon: movieSeen ? (
        <FontAwesomeIcon icon={faEye} color={"green"} />
      ) : (
        <FontAwesomeIcon icon={faEyeSlash} color={"grey"} />
      ),
      handler: movieSeen
        ? () => {
            movieAction.unwatch()
          }
        : () => {
            movieAction.watch()
          },
    },
  ]

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 150, hide: 300 }}
      overlay={renderTooltip}
    >
      <div
        className="col sm-6 md-4"
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        style={{
          maxWidth: "100px",
          width: "100%",
          minWidth: "80px",
          height: "100px",
          transition: "0.2s",
          cursor: "pointer",
          background: `${props.hovered ? "black" : "transparent"}`,
          border: `3px solid ${props.hovered ? "green" : "transparent"}`,
          borderRadius: "3px",
          padding: "5px",
        }}
      >
        <img
          style={{
            width: "100%",
            minWidth: "40px",
            height: "90px",
            // minHeight: 300,
            transition: "0.2s",
            opacity: `${props.hovered ? "0.5" : "1"}`,
            borderRadius: "2px",
            // objectFit: "cover",
          }}
          alt="batman"
          src={movie.Poster}
          onClick={() => {
            history.push(`/film/${movie.imdbID}`)
          }}
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
            borderRadius: "10px",
            // minHeight: "36px",
          }}
        >
          {loggedIn &&
            actions.map((action: any) => (
              <span onClick={action.handler}>{action.icon}</span>
            ))}
        </div>
      </div>
    </OverlayTrigger>
  )
}

export default MovieCard
