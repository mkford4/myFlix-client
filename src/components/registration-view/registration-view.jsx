import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap/';

import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [Birthday, setBirthday] = setState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://bechflix.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email
    })
      .catch(e => {
        console.log('error registering the user');
        alert('Something wasn\'t entered right');
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Register Here</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder="Enter a username"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength="8"
                      placeholder="Your password must be 8 or more characters"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );

  RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired
  };

}