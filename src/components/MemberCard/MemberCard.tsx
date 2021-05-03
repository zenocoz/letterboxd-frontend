import { useEffect } from "react"
// import { IMemberCardProps } from "./interface"
import { useHistory } from "react-router-dom"
import "./MemberCard.css"

// {
//   username,
//   _watchedMovies,
//   _id,
//   picture,
// }: IMemberCardProps

const MemberCard = (props: any) => {
  const history = useHistory()
  const { member } = props

  useEffect(() => {
    console.log("test", member.totalWatched)
  }, [])
  return (
    <div className="col-2 mb-2 mr-2">
      <img
        id="member-pic"
        src={member.picture}
        alt="https://res.cloudinary.com/drbq4el2x/image/upload/v1618673253/striveTest/xqlu1w52dncytydwlt1l.jpg"
      />
      <div style={{ color: "white" }}>
        <p
          onClick={() => {
            history.push("/user/" + member._id)
          }}
          style={{ cursor: "pointer" }}
        >
          {member.username}
        </p>
        <div className="d-flex">
          <p>{member.totalWatched} films</p>
        </div>
      </div>
    </div>
  )
}

export default MemberCard
