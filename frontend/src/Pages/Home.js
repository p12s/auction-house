import React, { Component } from "react";
import { Card, CardDeck, Container, Button, Row, Col } from "react-bootstrap";

export default class Home extends Component {
  render() {
    return (
      <>
        <Container>
          <h2 className="text-center m-4">Our team</h2>
          <CardDeck className="m-4">
            {/* Почему-то CardDeck автоматически не выровнял кол-во колоно, пришлось доабвить Col */}
            <Row>
              <Col sm={4}>
                <Card bg="light">
                  <Card.Img
                    variant="top"
                    src="/images/2.jpg"
                    alt="2"
                    width="400"
                    height="280"
                  />
                  <Card.Body>
                    <Card.Title>Developers</Card.Title>
                    <Card.Text>These are supermen</Card.Text>
                    <Button variant="primary">About supermen</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4}>
                <Card bg="light">
                  <Card.Body>
                    <Card.Title>Designers</Card.Title>
                    <Card.Text>These are supermen</Card.Text>
                    <Button variant="primary">About supermen</Button>
                  </Card.Body>
                  <Card.Img
                    variant="bottom"
                    src="/images/3.jpg"
                    alt="3"
                    width="400"
                    height="280"
                  />
                </Card>
              </Col>
              <Col sm={4}>
                <Card bg="light">
                  <Card.Img
                    variant="top"
                    src="/images/4.jpg"
                    alt="4"
                    width="400"
                    height="280"
                  />
                  <Card.Body>
                    <Card.Title>Sales</Card.Title>
                    <Card.Text>These are supermen</Card.Text>
                    <Button variant="primary">About supermen</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </CardDeck>
        </Container>
      </>
    );
  }
}
