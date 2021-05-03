import { useState, useContext, useEffect } from "react"
import { useSelector } from "react-redux"
// import { Tooltip } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import { API } from "../../API"

//context
import { UserContext as Context } from "../../context"

const ClubMovieCard = ({
  _id,
  Poster,
  imdbID,
  Title,
  onMouseEnter,
  onMouseLeave,
  hovered,
  clubId,
}: any) => {
  const history = useHistory()

  // const renderTooltip = (props: any) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     {props.Title}
  //   </Tooltip>
  // )
  const [chooser, setChooser] = useState(false)

  //clubs array context
  const { _filmClubsContext }: any = useContext(Context)
  const { _filmClubs } = _filmClubsContext

  const { userInfo } = useSelector((state: any) => state.user)

  //TODO probably doesn't need to be asyn - check
  const findIfCurrentMemberIsChooser = async () => {
    const currentClub = await _filmClubs.find(
      (club: any) => club._id === clubId
    )
    if (currentClub) {
      console.log("current club", currentClub.name)
      const currentMember = await currentClub.members.find(
        (member: any) => member.clubMember === userInfo._id
      )
      console.log(currentMember)
      if (currentMember.chooser) {
        setChooser(true)
      }
    }
  }

  useEffect(() => {
    findIfCurrentMemberIsChooser()
  }, [])

  return (
    <div
      className=" sm-8  mb-1"
      style={{
        height: "100%",
        transition: "0.2s",
        cursor: "pointer",
        // background: `${hovered ? "black" : "transparent"}`,
        // border: `5px solid ${hovered ? "green" : "transparent"}`,
      }}
      //   onMouseEnter={onMouseEnter}
      //   onMouseLeave={onMouseLeave}
    >
      <img
        style={{
          height: "100%",
          borderRadius: "3px",
          transition: "0.2s",
          //   opacity: `${hovered ? "0.5" : "1"}`,
        }}
        src={Poster}
        alt=""
        onClick={() =>
          chooser
            ? API.startWatchingMovie(clubId, _id)
            : history.push(`/film/${imdbID}`)
        }
      />
    </div>
  )
}

export default ClubMovieCard
