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

    if (loggedIn) {
      const filteredMembers = await members.filter(
        (member: any) => member._id !== userInfo._id
      )
      setFilterdMemberList(filteredMembers)
    }
  }

  useEffect(() => {
    getMembers()
  }, [])

  return (
    <div className="row popular-members d-flex justify-content-around">
      {loggedIn
        ? filteredMemberList.length > 0 &&
          filteredMemberList.map((member: any, i: number) => (
            <MemberMini member={member._id} key={i} withInfo={false} />
          ))
        : memberList.length > 0 &&
          memberList.map((member: any, i: number) => (
            <MemberMini member={member._id} key={i} withInfo={false} />
          ))}
    </div>
  )
}

export default PopularMembers
