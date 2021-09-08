import React, { Component } from "react";

import {
    FormControl,
    Nav,
    Navbar,
    Container,
    Form,
    Button,
} from "react-bootstrap";
import logo from "./opensea.svg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "../Pages/Home";
import Detail from "../Pages/Detail";
import Profile from "../Pages/Profile";

export default class Header extends Component {
    render() {
        return (
            <div>
                <Navbar
                    collapseOnSelect
                    expand="md"
                    bg="light"
                    variant="light"
                    className="text-dark"
                    fixed="top"
                >
                    <Container fluid>
                        <Navbar.Brand href="/">
                            <img
                                src={logo}
                                height="30"
                                width="30"
                                className="d-inline-block align-top"
                                alt="Logo"
                            />{" "}
                            FakeAuction
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse
                            id="responsive-navbar-nav"
                            className="d-flex justify-content-between"
                        >
                            <Form inline className="d-flex w-50">
                                <FormControl
                                    type="text"
                                    placeholder="Search items"
                                    className="mr-4"
                                />
                                <Button variant="outline-info" className="ml-4">Search</Button>
                            </Form>
                            <Nav className="mr-auto">
                                <Nav.Link href="/detail">Detail</Nav.Link>
                                <Nav.Link href="/">Marketplace</Nav.Link>
                                <Nav.Link href="/profile" className="font-weight-bold">Profile</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Router>
                    <Switch>
                        <Route exact path="/detail" component={Detail} />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/profile" component={Profile} />
                    </Switch>
                </Router>
            </div>
        );
    }
}
