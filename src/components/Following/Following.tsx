import React from "react"
import MemberMini from "../MemberMini/MemberMini"
import { useSelector } from "react-redux"

const Following = () => {
  const { userInfo } = useSelector((state: any) => state.user)

  return (
    <div className="row">
      {userInfo.following &&
        userInfo.following.map((member: any) => <MemberMini {...member} />)}
    </div>
  )
}

export default Following
