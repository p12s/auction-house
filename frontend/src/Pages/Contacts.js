import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default class Contacts extends Component {
  render() {
    return (
      <Container className="mt-4" style={{ width: "500px" }}>
        <h2 className="text-center m-4">Contact us</h2>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Your email" />
            <Form.Text>Share with us, we keep't secrets 🌘</Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
