import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, Container, Row, Col, CardGroup } from 'react-bootstrap/';
import { Link } from "react-router-dom";
import './login-view.scss';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view.jsx';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  //validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 6) {
      setUsernameErr('Username must be at least 6 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://bechflix.herokuapp.com/login', {
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
    }
  };


  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title /*style={(textAlign: "center")}*/ >Login in Here</Card.Title>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={e => setUsername(e.target.value)} />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>

                <Button variant="primary"
                  type="submit"
                  onClick={handleSubmit}>
                  Submit
                </Button>

              </Form>

              <div><br></br>
                <span>Or create an account here:</span><br></br>
                <Button href="/register">Register</Button>
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