import React, { useState, useContext } from "react"
import { signin } from ".."
import { Modal, Form, Button } from "react-bootstrap"
import { UserContext } from "../../../context"

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { providerModals } = useContext(UserContext)
  const { signInModal } = providerModals
  const { setSignIn } = signInModal

  const { email, password } = formData

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
    const response = await signin(formData)
    if (response.errors) {
      // setFormData({
      //   ...formData,
      //   errorMsg: response.errors,
      //   successMsg: "",
      // });
    } else {
      setFormData({
        email: "",
        // username: "",
        password: "",
        // successMsg: "Successfully created! Please login",
      })
      setSignIn(false)
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
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default SignIn
