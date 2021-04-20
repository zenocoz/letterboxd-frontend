//redux and hooks
import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useMovieStatus } from "../../custom_hooks"

import { IMovieCardProps } from "./interface"
// import { UserContext } from "../../context"
import { API } from "../../API"
import { checkViews, checkUserViews } from "../../utils"

//external libraries
import { Card, Col } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faStar, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

//style
import "./MovieCard.css"

const MovieCard = (props: any) => {
  const width = "200px "
  const height = "300px"
  const { movie, loggedIn = [] } = props

  const history = useHistory()

  const { userInfo } = useSelector((state: any) => state.user)
  const movieAction = useMovieStatus(
    userInfo._id,
    props.movie._id,
    props.movie.imdbID
  )
  const [movieSeen, setMovieSeen] = useState<any>(false)

  function like(i: number) {
    alert(`Liked movie is }`)
  }

  useEffect(() => {
    setMovieSeen(checkUserViews(userInfo.watchedMovies, movie._id))
  }, [userInfo.watchedMovies])

  const actions = [
    {
      icon: "❤️",
      handler: () => like(1),
    },
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
    <div
      // className="col sm-12 md-8"
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      style={{
        width,
        height,
        transition: "0.2s",
        cursor: "pointer",
        background: `${props.hovered ? "black" : "transparent"}`,
        border: `5px solid ${props.hovered ? "green" : "transparent"}`,
        borderRadius: "3px",
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          transition: "0.2s",
          opacity: `${props.hovered ? "0.5" : "1"}`,
          borderRadius: "2px",
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
        }}
      >
        {loggedIn &&
          actions.map((action: any) => (
            <span onClick={action.handler}>{action.icon}</span>
          ))}
      </div>
    </div>
  )
}

export default MovieCard

// (
//   <>
//     {loggedIn ? (
//       <Col className="md-8 mb-4 mr-2" md={1} style={{ height: "10rem" }}>
//         <Card
//           className="movie-card position-relative"
//           style={{ width: "100%" }}
//         >
//           <Card.Img
//             className="img-fluid rounded w-100"
//             variant="top"
//             style={{ width: "100%" }}
//             src={movie.Poster}
//           />
//           <div className="options-container">
//             <div className="options-content">
//               <div className="d-flex align-items-center mb-3">
//                 {/* <div className="play-btn gradient"></div> */}
//                 {/* <h6 className="mb-0">Add</h6> */}
//                 <span className="ml-auto">
//                   {/* <!-- <i class="fa fa-plus fa-lg" aria-hidden="true"></i> --> */}
//                 </span>
//               </div>
//               <div className="movie-info">
//                 <h6 onClick={() => history.push(`/film/${movie.imdbID}`)}>
//                   {movie.Title}
//                 </h6>
//                 <h6>{movie.Year}</h6>
//               </div>
//               <div className="icons">
//                 <p>
//                   {wasSeen ? (
//                     <FontAwesomeIcon
//                       icon={faEye}
//                       size="3x"
//                       color={"green"}
//                       onClick={() => {
//                         actions.unwatch()
//                       }}
//                     />
//                   ) : (
//                     <FontAwesomeIcon
//                       icon={faEyeSlash}
//                       size="3x"
//                       color={"grey"}
//                       onClick={() => {
//                         actions.watch()
//                       }}
//                     />
//                   )}
//                 </p>
//                 <p>
//                   {" "}
//                   <FontAwesomeIcon icon={faStar} size="3x" color="gold" />
//                 </p>
//               </div>
//               <p style={{ height: "4em" }}></p>{" "}
//               <div className="movie-footer">
//                 <span className="mr-2">{movie.Director}</span>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </Col>
//     ) : (
//       <Col md={2}>
//         <Card
//           style={{ width: "10rem" }}
//           className="movie-card position-relative mb-2"
//         >
//           <Card.Img
//             className="img-fluid rounded w-100"
//             variant="top"
//             style={{ width: "100%", height: "100%" }}
//             src={movie.Poster}
//             onClick={() => history.push(`/film/${movie.imdbID}`)}
//           />
//           <div className="options-container">
//             <div className="options-content">
//               {/* <div className="icons">
//                 <p>
//                   {" "}
//                   <FontAwesomeIcon icon={faEye} size="3x" color="green" />
//                 </p>
//                 <p>
//                   {" "}
//                   <FontAwesomeIcon icon={faClock} size="3x" color="gold" />
//                 </p>
//               </div> */}
//               <p style={{ height: "4em" }}></p>{" "}
//               <div className="movie-footer">
//                 <span className="mr-2">
//                   {" "}
//                   <FontAwesomeIcon
//                     icon={faEye}
//                     size="3x"
//                     color="green"
//                     // onClick={() => {
//                     //  go to movie page but not logged in
//                     // }}
//                   />
//                   <FontAwesomeIcon icon={faStar} size="3x" color="gold" />
//                 </span>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </Col>
//     )}
//   </>
// )
