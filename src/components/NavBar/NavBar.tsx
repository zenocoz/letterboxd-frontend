import React, { useState } from "react"
import { Navbar, Nav, Form, Button, FormControl, Modal } from "react-bootstrap"
import letterboxd from "../../assets/letterboxd-logo-1000px.png"
import CreateAccount from "../Auth/CreateAccount/CreateAccount"
import SignIn from "../Auth/SignIn/SignIn"
import "./NavBar.css"

const NavBar = () => {
  const closeCreateAccount = (show: boolean) => {
    setCreateAccount(show)
  }

  const closeSignIn = (show: boolean) => {
    setSignIn(show)
  }

  const [createAccount, setCreateAccount] = useState(false)
  const [signIn, setSignIn] = useState(false)

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="justify-content-between">
        <img src={letterboxd} />
        <Nav className="mr-auto nav-items ">
          <Nav.Link onClick={() => setSignIn(true)}>SIGN IN</Nav.Link>
          <Nav.Link onClick={() => setCreateAccount(true)}>
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
      {createAccount === true && (
        <CreateAccount closeCreateAccount={closeCreateAccount} />
      )}
      {signIn === true && <SignIn closeSignIn={closeSignIn} />}
    </div>
  )
}

export default NavBar
