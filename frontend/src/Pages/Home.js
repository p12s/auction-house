import React, { Component, Link } from "react";
import { Card, CardDeck, Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import NumberFormat from 'react-number-format';
import Accordion from 'react-bootstrap/Accordion'
import {Redirect} from 'react-router-dom';

function loadCategory() {
    console.log('load category');
}

function openDetailPage() {
    window.location.href = window.location.protocol + '//' + window.location.host + '/detail';
}

export default class Home extends Component {

    
    

    render() {



        return (
            <>
                <Container fluid  style={{paddingTop: "70px"}}>
                    <Row className="mt-10">
                        <Col xs={2}>
                            <Accordion>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        Status
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <Button variant="outline-secondary mb-1">Buy now</Button>{' '}
                                            <Button variant="outline-secondary mb-1">On auction</Button>{' '}
                                            <Button variant="outline-secondary mb-1">New</Button>{' '}
                                            <Button variant="outline-secondary mb-1">Has offer</Button>{' '}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="1">
                                        Categories
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1" className="collapse show">
                                        <Card.Body>
                                            <ListGroup defaultActiveKey="#link1">
                                                <ListGroup.Item action onClick={loadCategory}>Antiques and art objects</ListGroup.Item>
                                                <ListGroup.Item action onClick={loadCategory}>Apartments</ListGroup.Item>
                                                <ListGroup.Item action onClick={loadCategory}>Built-in rooms</ListGroup.Item>
                                                <ListGroup.Item action onClick={loadCategory}>Garages</ListGroup.Item>
                                                <ListGroup.Item action onClick={loadCategory}>Houses, cottages</ListGroup.Item>
                                                <ListGroup.Item action onClick={loadCategory}>Investment contract rights</ListGroup.Item>
                                                <ListGroup.Item action onClick={loadCategory}>Land</ListGroup.Item>
                                                <ListGroup.Item action onClick={loadCategory}>Lease right</ListGroup.Item>
                                                <ListGroup.Item action onClick={loadCategory}>Movable property</ListGroup.Item>
                                                <ListGroup.Item action onClick={loadCategory}>Property complexes</ListGroup.Item>
                                                <ListGroup.Item action onClick={loadCategory}>Scrap metal</ListGroup.Item>
                                                <ListGroup.Item action onClick={loadCategory}>Shares, shares</ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Col>
                        <Col xs={10}>
                            <CardDeck>
                                {/* Почему-то CardDeck автоматически не выровнял кол-во колоно, пришлось доабвить Col */}
                                {[...Array(4)].map((val, row) =>
                                    <Row className="grid flex-nowrap mb-4" key={row}>
                                        {[...Array(4)].map((val, col) =>
                                            <Col  className="grid" key={col}>
                                                {/* <Link to="/some-url" /> */}
                                                <Card className="card-hover" bg="light" tag="a" onClick={openDetailPage} style={{ cursor: "pointer" }}>
                                                    <Card.Img
                                                        variant="top"
                                                        src={"/images/" + col +".jpg"}
                                                        data-test={col}
                                                        alt="2"
                                                        width="400"
                                                        height="280"
                                                    />
                                                    <Card.Body>
                                                        <div className="card-description">
                                                            <p className="object-owner">FAANG</p>
                                                            <p className="object-title">Building on st. Bucharest</p>
                                                            <p className="object-price">
                                                                <NumberFormat value={123000000.00} displayType={'text'} thousandSeparator={true} suffix={' \u20BD'} />
                                                            </p>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )}
                                    </Row>
                                )}
                            </CardDeck>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
