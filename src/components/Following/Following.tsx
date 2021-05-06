import { useState, useEffect } from "react"
import MemberMini from "../MemberMini/MemberMini"
import { useSelector } from "react-redux"
import "./Following.css"

const Following = (props: any) => {
  const { userInfo, loggedIn } = useSelector((state: any) => state.user)
  const [friends, setFriends] = useState([])

  useEffect(() => {
    if (loggedIn && userInfo.following.length > 0) {
      setFriends(userInfo.following)
    }
  }, [])

  return (
    <div className="row mt-5 following d-flex justify-content-between px-3">
      {friends.length > 0 &&
        friends.map((member: any, i: number) => (
          <MemberMini
            member={member}
            withInfo={props.withInfo}
            key={i}
            club={props.club}
          />
        ))}
    </div>
  )
}

export default Following
