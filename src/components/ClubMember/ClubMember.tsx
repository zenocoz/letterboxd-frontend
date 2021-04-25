import React, { useState, useEffect, useContext } from "react"
import { API } from "../../API"
import MovieCardSmall from "../MovieCardSmall/MovieCardSmall"
import { setKeyword, loadSearchResults } from "../../store/search/reducer"
import { useSelector, useDispatch } from "react-redux"
import { Form, FormControl } from "react-bootstrap"
import { UserContext as Context } from "../../context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCrown } from "@fortawesome/free-solid-svg-icons"

const ClubMember = (props: any) => {
  //state
  const [clubFriend, setClubFriend] = useState({
    username: "",
    picture: "",
    email: "",
  })

  const { username, picture, email } = clubFriend

  //club id pass it
  const { currentFilmClubContext }: any = useContext(Context)
  const { currentFilmClub, setCurrentFilmClub } = currentFilmClubContext

  const dispatch = useDispatch()
  //current user
  const { userInfo } = useSelector((state: any) => state.user)
  useEffect(() => {
    ;(async () => {
      const friend = await API.getMemberById(props.member.clubMember)
      setClubFriend({ ...friend })
    })()
  }, [])

  //film club search bar
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
    <div className="col-2 justify-content-center">
      <div className="d-flex">
        <img
          src={picture}
          style={{
            opacity: props.member.confirmed ? "1" : "0.3",
            width: "2rem",
            height: "2rem",
          }}
        />
        {props.member.chooser && (
          <FontAwesomeIcon
            className="mr-1"
            icon={faCrown}
            color={"gold"}
            size="1x"
          />
        )}

        <div className="ml-2" style={{ height: "5rem", width: "6rem" }}>
          {props.member.film !== null && (
            <MovieCardSmall
              {...props.member.film}
              withInfo={false}
              // clubId={props.clubId}
              // memberId={props.member.clubMember}
            />
          )}
        </div>
      </div>

      <div>
        {props.member.confirmed &&
          !props.member.chooser &&
          props.member.clubMember === userInfo._id && (
            /*props.member.clubMember === userInfo._id &&*/ <Form
              onSubmit={handleSearchSubmit}
            >
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
      </div>
    </div>
  )
}

export default ClubMember
