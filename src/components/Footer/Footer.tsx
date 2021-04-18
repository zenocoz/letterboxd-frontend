import React from "react"
import "./Footer.css"
import { Row, Col } from "react-bootstrap"

const Footer = () => {
  return (
    <Row>
      <Col>
        <footer className="footer">
          <span>Letterboxd - A Social Network for Film Lovers</span>
        </footer>
      </Col>
    </Row>
  )
}

export default Footer
