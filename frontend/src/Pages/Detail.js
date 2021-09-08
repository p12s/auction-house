import React, { Component } from "react";
import { Container, Media, Col, Row, Card, Button, Table, Accordion, Breadcrumb } from "react-bootstrap";
import NumberFormat from 'react-number-format';
import { takeBid } from '../actions/bid';

// TODO class-овый подход устарел, нужно все переделать на функции
export default class Detail extends Component {

    takeBid() {
        console.log('take a bid')
        takeBid()
    }

    render() {
        return (
            <Container style={{paddingTop: "70px", paddingBottom: "70px"}}>
                <Breadcrumb className="mb-0">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/apartments">Apartments</Breadcrumb.Item>
                    <Breadcrumb.Item active>Building on st. Bucharest</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md="5">
                        <Media>
                            <img
                                width="100%"
                                height={508}
                                className="mr-3"
                                alt="1"
                                src="/images/1.jpg"
                            />
                            <Media.Body>
                                <Accordion className="mt-3">
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="0" variant="light">
                                            Description
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0"  className="collapse show">
                                            <Card.Body>
                                                <p>Why do we use it?</p>
                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                                                <p>Where does it come from?</p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </Media.Body>
                        </Media>
                    </Col>
                    <Col md="7">
                        <h4>Фронтенд сделан с использованием class-ов React, что сейчас считается устаревшим.<br/>Однако для демонстрации идеи этого достаточно.</h4>
                        <h1>Building on st. Bucharest</h1>
                        <div>
                            <span>Owned by <Button variant="link" className="p-lg-0">FAANG</Button></span>
                            <span className="m-3">8 views</span>
                            <span className="m-3">1 favorite</span>
                        </div>
                        <Card className="mt-3">
                            <Card.Body>
                                <div className="card-description">
                                    <p>
                                        <span className="price-name object-owner">Start price</span>
                                        <span className="object-price-regular">
                                            <NumberFormat value={110000000.00} displayType={'text'} thousandSeparator={true} suffix={' \u20BD'} />
                                        </span>
                                    </p>
                                    <p>
                                        <span className="price-name object-owner">Current price</span>
                                        <span className="object-price-current">
                                            <NumberFormat value={114000000.00} displayType={'text'} thousandSeparator={true} suffix={' \u20BD'} />
                                        </span>
                                    </p>
                                    <p>
                                        <span className="price-name object-owner">Bid Increment</span>
                                        <span className="object-price-regular">
                                            <NumberFormat value={2000000.00} displayType={'text'} thousandSeparator={true} suffix={' \u20BD'} />
                                        </span>
                                    </p>
                                    <p>
                                        <span className="price-name object-owner">Bid decrement</span>
                                        <span className="object-price-regular">
                                            <NumberFormat value={1000000.00} displayType={'text'} thousandSeparator={true} suffix={' \u20BD'} />
                                        </span>
                                    </p>
                                    <p>
                                        <span className="price-name object-owner">Blitz price</span>
                                        <span className="object-price-regular">
                                            <NumberFormat value={200000000.00} displayType={'text'} thousandSeparator={true} suffix={' \u20BD'} />
                                        </span>
                                    </p>
                                </div>{' '}
                                <Button onClick={this.takeBid} variant="primary" size="lg" className="mt-2">Take a bid</Button>
                            </Card.Body>
                        </Card>
                        <Table className="mt-4" striped bordered hover>
                            <thead>
                            <tr>
                                <th>Price</th>
                                <th>Time</th>
                                <th>Owner</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><NumberFormat value={114000000.00} displayType={'text'} thousandSeparator={true} suffix={' \u20BD'} /></td>
                                <td>09.08.2021 12:25:01</td>
                                <td>Mister Z (You)</td>
                            </tr>
                            <tr>
                                <td><NumberFormat value={112000000.00} displayType={'text'} thousandSeparator={true} suffix={' \u20BD'} /></td>
                                <td>08.08.2021 12:20:21</td>
                                <td>Mister Y</td>
                            </tr>
                            <tr>
                                <td><NumberFormat value={110000000.00} displayType={'text'} thousandSeparator={true} suffix={' \u20BD'} /></td>
                                <td>07.08.2021 12:17:31</td>
                                <td>Mister X</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}
