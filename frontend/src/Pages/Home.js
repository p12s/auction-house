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
                    src="https://image.shutterstock.com/image-photo/successful-company-happy-workers-600w-722985031.jpg"
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
                    src="https://image.shutterstock.com/image-photo/smiling-diverse-colleagues-gather-boardroom-600w-1687550977.jpg"
                  />
                </Card>
              </Col>
              <Col sm={4}>
                <Card bg="light">
                  <Card.Img
                    variant="top"
                    src="https://image.shutterstock.com/image-photo/team-competing-tug-war-600w-1090948673.jpg"
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
