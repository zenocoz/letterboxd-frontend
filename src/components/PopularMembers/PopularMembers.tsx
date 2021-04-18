import { useState, useEffect } from "react"
import MemberMini from "../MemberMini/MemberMini"
import { useSelector } from "react-redux"
import { API } from "../../API"

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
    <div>
      {loggedIn
        ? filteredMemberList.length > 0 &&
          filteredMemberList.map((member, i) => (
            <MemberMini {...member} key={i} />
          ))
        : memberList.length > 0 &&
          memberList.map((member, i: number) => (
            <MemberMini {...member} key={i} />
          ))}
    </div>
  )
}

export default PopularMembers
