import React from "react"
import { Card, Col } from "react-bootstrap"
import { IMemberCardProps } from "./interface"

const MemberCard = ({ username, watchedMovies }: IMemberCardProps) => {
  return (
    <Col>
      <div
        className="mb-2 mr-2"
        style={{
          width: "100%",
          height: "30vh",
          backgroundColor: "#82ffc7",
        }}
      >
        <Card style={{ width: "100%", height: "100%" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{username}</Card.Title>
            <Card.Text>
              <p style={{ color: "727068" }}>1.4k films 969 reviews</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Col>
  )
}

export default MemberCard
