import { API } from "../../API"
import { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import Banner from "../../components/Banner/Banner"
import { Row, Col, Jumbotron } from "react-bootstrap"
import "./Members.css"
import PopularMembers from "../../components/PopularMembers/PopularMembers"
import PopularReviews from "../../components/PopularReviews/PopularReviews"
import MemberCard from "../../components/MemberCard/MemberCard"

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
      <Row>
        <Col sm={12} md={8}>
          <PopularMembers />
        </Col>
      </Row>
    </>
    // <div className="members">
    //   <ul>
    //     {memberList.length > 0 &&
    //       memberList.map((member: any) => (
    //         <li key={member._id}>
    //           {member.username}
    //           {loggedIn && member._id !== userInfo._id && (
    //             <button
    //               onClick={() => {
    //                 followMember(member._id)
    //               }}
    //             >
    //               follow
    //             </button>
    //           )}
    //         </li>
    //       ))}
    //   </ul>
    // </div>
  )
}

export default Members
