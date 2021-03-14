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
          <Nav.Link href="#home">Sign In</Nav.Link>
          <Nav.Link href="#features">Create Account</Nav.Link>
          <Nav.Link href="#pricing">Films</Nav.Link>
          <Nav.Link href="#pricing">Lists</Nav.Link>
          <Nav.Link href="#pricing">Members</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
      </Navbar>
    </div>
  )
}

export default NavBar
