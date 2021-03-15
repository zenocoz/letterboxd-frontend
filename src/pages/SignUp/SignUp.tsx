import React from "react"
import "./SignUp.css"
import { Row, Jumbotron, Button, Col } from "react-bootstrap"

const SignUp = () => {
  return (
    <div className="colorScheme">
      <Row>
        <Col>
          <Jumbotron></Jumbotron>
          <div className="welcome-texts">
            <h1>Track films you've watched.</h1>
            <h1>Save those you want to see.</h1>
            <h1>Tell your friends what's good.</h1>
            <Button variant="success">GET STARTED - IT'S FREE!</Button>
            <p>The social network for film lovers</p>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default SignUp
