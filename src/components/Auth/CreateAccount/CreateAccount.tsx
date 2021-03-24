import React, { useState } from "react"
import "./CreateAccount.css"
import { Modal, Form, Button } from "react-bootstrap"
import { register } from ".."

const CreateAccount = (props: any) => {
  //ANY
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  })
  const { email, username, password } = formData

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
    // API.registerUser(formData)
    const response = await register(formData)
    if (response.errors) {
      // setFormData({
      //   ...formData,
      //   errorMsg: response.errors,
      //   successMsg: "",
      // });
    } else {
      setFormData({
        email: "",
        username: "",
        password: "",
        // successMsg: "Successfully created! Please login",
      })
      props.closeCreateAccount(false)
    }
  }

  return (
    <div>
      <Modal
        dialogClassName="sign-in"
        show={true}
        onHide={() => {
          props.closeCreateAccount(false)
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
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CreateAccount
