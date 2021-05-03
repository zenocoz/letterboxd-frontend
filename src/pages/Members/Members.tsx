import { API } from "../../API"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Banner from "../../components/Banner/Banner"
import { Row, Jumbotron } from "react-bootstrap"
import "./Members.css"
import MemberCard from "../../components/MemberCard/MemberCard"
import Following from "../../components/Following/Following"

const Members = () => {
  const [memberList, setMemberList] = useState([])
  const { loggedIn, userInfo } = useSelector((state: any) => state.user)
  const [filteredMemberList, setFilterdMemberList] = useState([])

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
    <>
      <Banner />

      <Row>
        <Jumbotron className="mt-5 members-hero d-flex">
          <h2>Film lovers, critics and friends — find popular members.</h2>
        </Jumbotron>
      </Row>
      <h5 style={{ color: "white" }}>Popular members</h5>

      <div className="row d-flex justify-content-between align-center">
        {loggedIn
          ? filteredMemberList.length > 0 &&
            filteredMemberList.length >= 4 &&
            filteredMemberList
              .slice(0, 4)
              .map((member: any, i: number) => (
                <MemberCard member={member} key={i} />
              ))
          : memberList.length > 0 &&
            memberList.length >= 4 &&
            memberList
              .slice(0, 4)
              .map((member: any, i: number) => (
                <MemberCard member={member} key={i} />
              ))}
      </div>

      <div style={{ maxWidth: "22rem" }}>
        {" "}
        <Following />
      </div>
    </>
  )
}

export default Members
