import React, { useState, useEffect, ReactElement } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"

const Backoffice = () => {
  //any
  const form = (): any => {
    ;<Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  }

  return (
    <Container>
      <Row xs={2} md={4} lg={6}>
        <Col>{form()}</Col>
      </Row>
    </Container>
  )
}

export default Backoffice
