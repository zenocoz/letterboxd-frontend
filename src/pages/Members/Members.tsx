import { API } from "../../API"
import { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"

const Members = () => {
  const [memberList, setMemberList] = useState([])
  const { loggedIn, userInfo } = useSelector((state: any) => state.user)

  const getMembers = async () => {
    const members = await API.getAllMembers()
    setMemberList(members)
  }

  const followMember = async (memberId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER}/api/users/${userInfo._id}/follow/${memberId}`,
        {
          headers: { "Content-type": "application/json" },
        }
      )
      if (response.statusText === "OK") {
        console.log(`${userInfo.username} followed`, memberId)
      } else {
        console.log("something went wrong in adding to seenBy")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMembers()
  }, [])

  return (
    <div className="members">
      <ul>
        {memberList.length > 0 &&
          memberList.map((member: any) => (
            <li key={member._id}>
              {member.username}
              {loggedIn && member._id !== userInfo._id && (
                <button
                  onClick={() => {
                    followMember(member._id)
                  }}
                >
                  follow
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Members
