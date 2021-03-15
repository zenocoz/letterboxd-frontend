import React from "react"
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap"
import letterboxd from "../../assets/letterboxd-logo-1000px.png"
import "./NavBar.css"

const NavBar = () => {
  return (
    <div>
      {" "}
      <Navbar bg="dark" variant="dark" className="justify-content-between">
        <img src={letterboxd} />
        <Nav className="mr-auto nav-items">
          <Nav.Link href="#home">SIGN IN</Nav.Link>
          <Nav.Link href="#features">CREATE ACCOUNT</Nav.Link>
          <Nav.Link href="#pricing">FILMS</Nav.Link>
          <Nav.Link href="#pricing">LISTS</Nav.Link>
          <Nav.Link href="#pricing">MEMBERS</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" className="mr-sm-2 search-bar" />
        </Form>
      </Navbar>
    </div>
  )
}

export default NavBar
