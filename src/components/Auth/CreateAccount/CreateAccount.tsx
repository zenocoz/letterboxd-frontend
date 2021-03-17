import React from "react"
import "./CreateAccount.css"
import { Modal, Form, Button } from "react-bootstrap"

const CreateAccount = (props: any) => {
  //ANY
  return (
    <div>
      <Modal
        dialogClassName="sign-in"
        show={true}
        onHide={() => {
          props.handleClose(false)
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

export default CreateAccount
