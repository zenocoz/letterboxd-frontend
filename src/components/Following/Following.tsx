import React, { useState, useEffect } from "react"
import MemberMini from "../MemberMini/MemberMini"
import { useSelector } from "react-redux"
import "./Following.css"

const Following = (props: any) => {
  const { userInfo } = useSelector((state: any) => state.user)
  const [friends, setFriends] = useState([])

  useEffect(() => {
    if (userInfo.following.length > 0) {
      setFriends(userInfo.following)
    }
  }, [])

  return (
    <div className="row mt-5 following">
      <div className="col d-flex " style={{ height: "6rem" }}>
        {friends.length > 0 &&
          friends.map((member: any, i: number) => (
            <MemberMini
              member={member}
              withInfo={false}
              key={i}
              club={props.club}
            />
          ))}
      </div>
    </div>
  )
}

export default Following
