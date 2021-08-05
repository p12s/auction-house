import React, { Component } from "react";
import { Container, Tab, Nav, Row, Col } from "react-bootstrap";

export default class About extends Component {
  render() {
    return (
      <Container className="mt-4">
        <h2 className="text-center m-4">About</h2>
        <Tab.Container id="ledt-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column mt-2">
                <Nav.Item>
                  <Nav.Link eventKey="first">Design</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Team</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Program</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth">Flex</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fifth">Custom</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content className="mt-3">
                <Tab.Pane eventKey="first">
                  <p>Design Design Design Design Design</p>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <p>Team Team Team Team Team Team Team</p>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <p>Program Program Program Program Program</p>
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  <p>Flex Flex Flex Flex Flex Flex Flex</p>
                </Tab.Pane>
                <Tab.Pane eventKey="fifth">
                  <p>Custom Custom Custom Custom Custom</p>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    );
  }
}
