import { useState, useEffect } from "react"
import MemberMini from "../MemberMini/MemberMini"
import { useSelector } from "react-redux"
import { API } from "../../API"

const PopularMembers = () => {
  const [memberList, setMemberList] = useState([])
  const { loggedIn, userInfo } = useSelector((state: any) => state.user)

  const getMembers = async () => {
    const members = await API.getAllMembers()
    setMemberList(members)
  }

  useEffect(() => {
    getMembers()
  }, [])

  return (
    <div>
      {memberList.length > 0 &&
        memberList.map((member) => <MemberMini {...member} />)}
    </div>
  )
}

export default PopularMembers
