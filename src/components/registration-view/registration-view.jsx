import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap/';
//import { Link } from "react-router-dom";
import './registration-view.scss';

export function RegistrationView(props) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [nameErr, setNameErr] = useState('');
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [birthdayErr, setBirthdayErr] = useState("");

  const validate = () => {
    let isReq = true;
    if (name) {
      setNameErr('Name is requried');
      isReq = false;
    }
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email Required');
      isReq = false;
    } else if (indexOf('@' === -1)) {
      setEmailErr('Email must have @ symbol to be valid');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://bechflix.herokuapp.com/users', {
        Name: name,
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration succesful, go ahead and log in!');
          window.open('/', '_self'); //opens self aka in current tab
        })
        .catch(e => {
          console.error(response);
          alert('Something wasn\'t entered right');
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Register Here</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername" className="reg-form-inputs">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder="Enter a username"
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formName" className="reg-form-inputs">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                    {nameErr && <p>{nameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="reg-form-inputs">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength="8"
                      placeholder="Your password must be 8 or more characters"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="Email" className="reg-form-inputs">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                    />
                    {emailErr && <p>{emailErr}</p>}
                  </Form.Group>
                  <Form.Group controlId="updateBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="date"
                      name="birthday"
                      onChange={(e) => setBirthday(e.target.value)}></Form.Control>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}>
                    Submit
                  </Button>
                  <p></p>
                  <p>Already registered? <Link to={'/'}>Sign In Here</Link></p>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );

  RegistrationView.propTypes = {
    regiser: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired
    }),
  };

}