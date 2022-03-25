import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, Container, Row, Col, CardGroup } from 'react-bootstrap/';

import './login-view.scss';
import axios from 'axios'

import { RegistrationView } from '../registration-view/registration-view.jsx';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /*  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  }; */

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://bechflix.herokuapp.com/users', {
      Username: username,
      Password: password,
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('user doesn\'t exist');
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title /*style={(textAlign: "center")}*/ >Login in Here</Card.Title>
              <Form>
                <Form.Group controlId="formGroupUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
              </Form>

              <div><br></br>
                <span>Or create an account here:</span><br></br>
                <Button id="login-button" type="submit">Register Here</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );

  LoginView.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired
  };

}