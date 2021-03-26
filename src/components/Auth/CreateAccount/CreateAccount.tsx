import React, { useState, useContext } from "react"
import "./CreateAccount.css"
import { register } from ".."
import { UserContext } from "../../../context"

//external libraries
import isEmail from "validator/lib/isEmail"
import isEmpty from "validator/lib/isEmpty"
import { Modal, Form, Button } from "react-bootstrap"

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    errorMsg: "",
  })

  const { providerModals }: any = useContext(UserContext)
  const { setCreateAccount }: any = providerModals.accountModal
  const { setSignIn }: any = providerModals.signInModal

  const { email, username, password, errorMsg } = formData

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

    if (isEmpty(email) || isEmpty(username) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      })
    } else if (!isEmail(email)) {
      setFormData({ ...formData, errorMsg: "Invalid email" })
    } else {
      let { email, username, password } = formData
      let body = { email, username, password }
      const response = await register(body)

      if (response.code > 400) {
        setFormData({
          ...formData,
          errorMsg: response.code,
        })
      } else {
        setFormData({
          email: "",
          username: "",
          password: "",
          errorMsg: "",
        })
        setCreateAccount(false)
        //redirect to sign in with prefilled areas maybe
        setTimeout(setSignIn(true), 3000)
      }
    }
  }

  return (
    <div>
      <Modal
        dialogClassName="sign-in"
        show={true}
        onHide={() => {
          setCreateAccount(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>JOIN LETTERBOXD</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>

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
            <Button variant="success" type="submit" onClick={handleSubmit}>
              Submit
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

export default CreateAccount
