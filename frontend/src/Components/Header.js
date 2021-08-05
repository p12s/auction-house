import React, { Component } from "react";

import {
  FormControl,
  Nav,
  Navbar,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import logo from "./logo192.png";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "../Pages/Home";
import About from "../Pages/About";
import Contacts from "../Pages/Contacts";
import Blog from "../Pages/Blog";

function checkApiConnection() {
  document.getElementById('result').innerHTML = '';

  const Http = new XMLHttpRequest();
  Http.upload.addEventListener("error", transferFailed, false);

  Http.onreadystatechange = function(){
    if (Http.readyState === 4){
      let resultTag = document.getElementById('result');
      if(Http.status === 200) {
        resultTag.appendChild(document.createTextNode('Shit say 👏🏿👏🏿👏🏿: ' + Http.statusText));
      } else {
        resultTag.appendChild(document.createTextNode('This shit dosn\'t work 👎🏿'));
      }
    } 
  }
  let apiHref = `${document.location.protocol}//${document.location.host}/api/health`;
  Http.open('GET', apiHref, true);
  Http.send();

  setTimeout(function () {
    clearStatus();
  }, 3000);
}

function transferFailed() {
  console.log('fail')
}

function clearStatus() {
  console.log('cleared')
  document.getElementById('result').innerHTML = '😴';
}

export default class Header extends Component {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <img
                src={logo}
                height="30"
                width="30"
                className="d-inline-block allign-top"
                alt="Logo"
              />
              React site
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="d-flex justify-content-between"
            >
              <Nav className="mr-auto">
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/contacts">Contacts</Nav.Link>
                <Nav.Link href="/blog">Blog</Nav.Link>
              </Nav>
              <Form inline className="d-flex">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-2"
                />
                <Button variant="outline-info">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
          <h1>🙍🏼‍♂️🙍🏼🙍🏼‍♂️🤷🏼‍♂️</h1>
          <Button variant="danger" onClick={checkApiConnection}>Click me to check API connection</Button>
          <h2 id="result">😴</h2>
        </Container>

        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contacts" component={Contacts} />
            <Route exact path="/blog" component={Blog} />
          </Switch>
        </Router>
      </>
    );
  }
}
