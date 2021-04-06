import React, { useState, useContext } from "react"

//external libraries
import { Modal, Form, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import isEmail from "validator/lib/isEmail"
import isEmpty from "validator/lib/isEmpty"

//context and own functions
import { UserContext } from "../../../context"
import { signin } from ".."

const SignIn = () => {
  const history = useHistory()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errorMsg: "",
  })
  const { email, password, errorMsg } = formData

  const { providerModals } = useContext(UserContext)
  const { setSignIn } = providerModals.signInModal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault()
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({ ...formData, errorMsg: "All fields are required" })
    } else if (!isEmail(email)) {
      setFormData({ ...formData, errorMsg: "Invalid email" })
    } else {
      let { email, password } = formData
      let body = { email, password }
      try {
        const response = await signin(body)
        if (response.code > 400) {
          console.log("sign in error")
          setFormData({
            ...formData,
            errorMsg: response.message,
          })
          console.log(response.message)
        } else {
          setFormData({
            email: "",
            // username: "",
            password: "",
            errorMsg: "",
          })
          setSignIn(false)
          console.log("Response", response)
          history.push("/home")
        }
      } catch (err) {
        console.log("signin error", err)
        setFormData({
          ...formData,
          errorMsg: err?.response?.data?.errors || "Something went wrong",
        })
      }
    }
  }

  return (
    <div>
      <Modal
        dialogClassName="sign-in"
        show={true}
        onHide={() => {
          setSignIn(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>SIGN IN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username or email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            {/* <Form.Group controlId="formBasicPassword">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group> */}
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="success" type="submit" onClick={handleSubmit}>
              SIGN IN
            </Button>
            {errorMsg && (
              <small className="ml-2 mb-2 mt-0 text-danger text-center">
                {errorMsg}
              </small>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default SignIn
