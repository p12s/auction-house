import React, { Component } from "react";
import { Container, Media, Col, Row, ListGroup, Card } from "react-bootstrap";

export default class Blog extends Component {
  render() {
    return (
      <Container className="mt-4">
        <h2 className="text-center m-4">Blog</h2>
        <Row>
          <Col md="9">
            <Media className="mt-3">
              <img
                width={150}
                height={150}
                className="mr-3"
                alt="1"
                src="https://habrastorage.org/getpro/habr/post_images/fad/3a5/744/fad3a57446df8e28f19fd56a65e50baa.gif"
              />
              <Media.Body>
                <h5>Blog post</h5>
                <p>
                  This is description. This is description. This is description.
                  This is description.
                  <br />
                  This is description. This is description. This is description.
                  This is description.
                  <br />
                  This is description. This is description. This is description.
                  This is description.
                  <br />
                  This is description. This is description. This is description.
                  This is description.
                  <br />
                  This is description. This is description. This is description.
                  This is description.
                  <br />
                </p>
              </Media.Body>
            </Media>
            <Media className="mt-3">
              <img
                width={150}
                height={150}
                className="mr-3"
                alt="2"
                src="https://habrastorage.org/getpro/habr/post_images/fad/3a5/744/fad3a57446df8e28f19fd56a65e50baa.gif"
              />
              <Media.Body>
                <h5>Blog post</h5>
                <p>
                  This is description. This is description. This is description.
                  This is description.
                  <br />
                  This is description. This is description. This is description.
                  This is description.
                  <br />
                  This is description. This is description. This is description.
                  This is description.
                  <br />
                  This is description. This is description. This is description.
                  This is description.
                  <br />
                  This is description. This is description. This is description.
                  This is description.
                  <br />
                </p>
              </Media.Body>
            </Media>
            <Media className="mt-3">
              <img
                width={150}
                height={150}
                className="mr-3"
                alt="3"
                src="https://habrastorage.org/getpro/habr/post_images/fad/3a5/744/fad3a57446df8e28f19fd56a65e50baa.gif"
              />
              <Media.Body>
                <h5>Blog post</h5>
                <p>
                  This is description. This is description. This is description.
                  This is description.
                  <br />
                  This is description. This is description. This is description.
                  This is description.
                  <br />
                  This is description. This is description. This is description.
                  This is description.
                  <br />
                  This is description. This is description. This is description.
                  This is description.
                  <br />
                  This is description. This is description. This is description.
                  This is description.
                  <br />
                </p>
              </Media.Body>
            </Media>
          </Col>
          <Col md="3">
            <h5 className="text-center mt-3">Category</h5>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>HTML6</ListGroup.Item>
                <ListGroup.Item>CSS4</ListGroup.Item>
                <ListGroup.Item>Go19</ListGroup.Item>
                <ListGroup.Item>C++22</ListGroup.Item>
                <ListGroup.Item>PHP9</ListGroup.Item>
              </ListGroup>
            </Card>
            <Card className="mt-3" bg="light">
              <Card.Body>
                <Card.Title>Side widget</Card.Title>
                <Card.Text>
                  This is description. This is description. This is description.
                  This is description.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
