import { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import { API } from "../../API"
import "./MemberMini.css"
import { UserContext as Context } from "../../context"
import Rating from "react-rating"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

// import { setKeyword, loadSearchResults } from "../../store/search/reducer"

const MemberMini = (props: any) => {
  const history = useHistory()

  //component state
  const [rating, setRating] = useState(0)
  const [selected, setSelected] = useState(false)
  // const [confirmed, setConfirmed] = useState(false)

  //regular members
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

  //regular members
  useEffect(() => {
    ;(async () => {
      const friend = await API.getMemberById(props.member)
      setFriend({ ...friend })
    })()
  }, [])

  //*******************add members to film club********************* */

  const handleSelected = () => {
    if (selected) {
      const filteredMembers = members.filter(
        (member: any) => member._id !== props.member
      )
      setFilmClubData({
        ...filmClubData,
        members: filteredMembers,
      })
      setSelected(false)
    } else {
      setSelected(true)
      members.push({
        clubMember: props.member,
        email: friend.email,
        confirmed: false,
        chooser: false,
        filmSelected: false,
      })
      setFilmClubData({ ...filmClubData, members })
    }
  }

  return (
    <div
      className="col-3 friend-info"
      style={{ backgroundColor: selected ? "red" : "#14181d" }}
    >
      {props.withInfo ? (
        <div
          className=" friend-info mx-1 my-2"
          style={{ backgroundColor: selected ? "red" : "#14181d" }}
        >
          <img src={picture} alt="" style={{ width: "5rem", height: "5rem" }} />
          <p
            onClick={() => {
              history.push("/user/" + props.member)
            }}
            style={{ cursor: "pointer" }}
          >
            {username}
          </p>
          <p className="d-flex">
            {rating > 0 && (
              <Rating
                readonly={true}
                initialRating={rating}
                fractions={2}
                emptySymbol={
                  <FontAwesomeIcon icon={faStar} size="1x" color={"grey"} />
                }
                fullSymbol={
                  <FontAwesomeIcon icon={faStar} size="1x" color={"yellow"} />
                }
              />
            )}
          </p>
        </div>
      ) : (
        <>
          {props.essential ? (
            <>
              {/* <div className="d-flex justify-content-center">
                <img
                  src={picture}
                  style={{
                    opacity: props.member.confirmed ? "1" : "0.3",
                    width: "2rem",
                    height: "2rem",
                  }}
                />

                <div className="ml-2" style={{ height: "5rem", width: "6rem" }}>
                  {props.member.film !== null && (
                    <MovieCardSmall
                      {...props.member.film}
                      withInfo={false}
                      // clubId={props.clubId}
                      // memberId={props.member._id}
                    />
                  )}
                </div>
              </div> */}

              {/* {props.member.confirmed &&
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
                )} */}
            </>
          ) : (
            <img
              src={picture}
              alt=""
              style={{ width: "3rem", height: "3rem" }}
            />
          )}
          <p
            onClick={() => {
              !props.club
                ? history.push("/user/" + props.member)
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
