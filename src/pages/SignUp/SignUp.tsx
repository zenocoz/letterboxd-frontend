import React from "react"
import "./SignUp.css"
import { Row, Jumbotron, Button, Col } from "react-bootstrap"

const SignUp = () => {
  return (
    <div className="colorScheme">
      <Row>
        <Col>
          <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
        </Col>
      </Row>
    </div>
  )
}

export default SignUp
