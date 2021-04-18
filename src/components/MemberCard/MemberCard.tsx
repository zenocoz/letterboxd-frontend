import React, { useEffect } from "react"
import { Card, Col } from "react-bootstrap"
// import { IMemberCardProps } from "./interface"
import { useHistory } from "react-router-dom"
import "./MemberCard.css"

// {
//   username,
//   _watchedMovies,
//   _id,
//   picture,
// }: IMemberCardProps

const MemberCard = (props: any) => {
  const history = useHistory()
  const { member } = props

  useEffect(() => {
    console.log("test", member.totalWatched)
  }, [])
  return (
    // <Col>
    //   <div
    //     className="mb-2 mr-2"
    //     style={{
    //       width: "100%",
    //       height: "30vh",
    //       backgroundColor: "#82ffc7",
    //     }}
    //   >
    //     <Card style={{ width: "100%", height: "100%" }}>
    //       <Card.Img
    //         variant="top"
    //         src={picture}
    //         style={{ height: "100%", width: "100%" }}
    //         alt="https://res.cloudinary.com/drbq4el2x/image/upload/v1608377311/striveTest/r5ra89fi4qsu24wsq4wr.jpg"
    //       />
    //       <Card.Body>
    //         <Card.Title
    //           onClick={() => {
    //             history.push("/user/" + _id)
    //           }}
    //         >
    //           {username}
    //         </Card.Title>
    //         <Card.Text>
    //           <p style={{ color: "727068" }}>1.4k films 969 reviews</p>
    //         </Card.Text>
    //       </Card.Body>
    //     </Card>
    //   </div>
    // </Col>

    <div className="col-2 mb-2 mr-2">
      <img
        id="member-pic"
        src={member.picture}
        alt="https://res.cloudinary.com/drbq4el2x/image/upload/v1608377311/striveTest/r5ra89fi4qsu24wsq4wr.jpg"
      />
      <div style={{ color: "white" }}>
        <p
          onClick={() => {
            history.push("/user/" + member._id)
          }}
          style={{ cursor: "pointer" }}
        >
          {member.username}
        </p>
        <div className="d-flex">
          <p>{member.totalWatched} films</p>
        </div>
      </div>
    </div>
  )
}

export default MemberCard
