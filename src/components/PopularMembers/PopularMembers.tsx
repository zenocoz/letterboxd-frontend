import { useState, useEffect } from "react"
import MemberMini from "../MemberMini/MemberMini"
import { useSelector } from "react-redux"
import { API } from "../../API"
import "./PopularMembers.css"

const PopularMembers = () => {
  const [memberList, setMemberList] = useState([])
  const [filteredMemberList, setFilterdMemberList] = useState([])

  const { loggedIn, userInfo } = useSelector((state: any) => state.user)

  const getMembers = async () => {
    const members = await API.getAllMembers()

    setMemberList(members)
    const filteredMembers = await members.filter(
      (member: any) => member._id !== userInfo._id
    )
    setFilterdMemberList(filteredMembers)
  }

  useEffect(() => {
    getMembers()
  }, [])

  return (
    <div className="popular-members d-flex">
      {loggedIn
        ? filteredMemberList.length > 0 &&
          filteredMemberList.map((member, i) => (
            <MemberMini member={member} key={i} withInfo={false} />
          ))
        : memberList.length > 0 &&
          memberList.map((member, i: number) => (
            <MemberMini member={member} key={i} withInfo={false} />
          ))}
    </div>
  )
}

export default PopularMembers
