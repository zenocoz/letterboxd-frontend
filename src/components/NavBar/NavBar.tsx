import React, { useState } from "react"
import { Navbar, Nav, Form, Button, FormControl, Modal } from "react-bootstrap"
import letterboxd from "../../assets/letterboxd-logo-1000px.png"
import "./NavBar.css"

const NavBar = () => {
  const handleClose = () => {}
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      {" "}
      <Navbar bg="dark" variant="dark" className="justify-content-between">
        <img src={letterboxd} />
        <Nav className="mr-auto nav-items">
          <Nav.Link href="#home">SIGN IN</Nav.Link>
          <Nav.Link onClick={() => setShowModal(true)}>
            {" "}
            CREATE ACCOUNT
          </Nav.Link>
          <Nav.Link href="#pricing">FILMS</Nav.Link>
          <Nav.Link href="#pricing">LISTS</Nav.Link>
          <Nav.Link href="#pricing">MEMBERS</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" className="mr-sm-2 search-bar" />
        </Form>
      </Navbar>
      <Modal
        dialogClassName="sign-in"
        show={showModal}
        onHide={() => {
          setShowModal(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>JOIN LETTERBOXD</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="I am at least 16 years old and I accept the terms of use"
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="I accept the Privacy Policy and I accept to the processing of my personal
              information in accordance with it."
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default NavBar
