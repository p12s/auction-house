import React, { Component } from "react";

import {
    Navbar,
    Container
} from "react-bootstrap";
import logo from "./opensea.svg";


export default class Footer extends Component {
    render() {
        return (
            <>
                <Navbar
                    expand="md"
                    bg="light"
                    variant="light"
                    className="text-dark mt-4 text-right"
                    fixed="bottom"
                >
                    <Navbar.Brand href="/">
                        <img
                            src={logo}
                            height="30"
                            width="30"
                            className="d-inline-block m-2"
                            alt="Logo"
                        />
                    </Navbar.Brand>
                </Navbar>
            </>
        );
    }
}
