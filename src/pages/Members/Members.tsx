import { API } from "../../API"
import { useState, useEffect } from "react"

const Members = () => {
  const [memberList, setMemberList] = useState([])

  const getMembers = async () => {
    const members = await API.getAllMembers()
    setMemberList(members)
  }

  useEffect(() => {
    getMembers()
  }, [])

  return (
    <div className="members">
      <ul>
        {memberList.length > 0 &&
          memberList.map((member: any) => (
            <li
              onClick={() => {
                console.log("follow")
              }}
            >
              {member.username}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Members
