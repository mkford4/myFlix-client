import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap/'
import { Link } from 'react-router-dom'
import './registration-view.scss'

export function RegistrationView(props) {
  const [values, setValues] = useState({
    Username: '',
    Password: '',
    FirstName: '',
    Email: '',
    Birthday: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    event.persist()
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value
    }))
  }

  const checkIfFormIsValid = () => {
    let isValid = true
    let newErrors = {}
    if (!values.Username) {
      isValid = false
      newErrors.Username = 'Username is required'
    } else if (values.Username.length < 6) {
      isValid = false
      newErrors.Username = 'Username must be at least 6 characters long'
    }

    if (!values.Password) {
      isValid = false
      newErrors.Password = 'Password is required'
    } else if (values.Password.length < 6) {
      isValid = false
      newErrors.Password = 'Password must be at least 6 characters long'
    }

    if (!values.Email) {
      isValid = false
      newErrors.Email = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
      isValid = false
      newErrors.Email = 'Invalid Email address'
    }

    if (!values.FirstName) {
      isValid = false
      newErrors.FirstName = 'First name is required'
    }

    if (!values.Birthday) {
      isValid = false
      newErrors.Birthday = 'Birthday is required'
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isReq = checkIfFormIsValid()
    console.log(isReq)
    console.log(values)
    if (isReq) {
      axios
        .post('https://bechflix.herokuapp.com/users', values)
        .then((response) => {
          const data = response.data
          console.log(data)
          alert('Registration successful, go ahead and log in!')
          window.open('/', '_self') //opens self aka in current tab
        })
        .catch((e) => {
          console.error(response)
          alert("Something wasn't entered right")
        })
    }
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Register Here</Card.Title>
                <Form>
                  <Form.Group controlId='formUsername' className='reg-form-inputs'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      value={values.Username}
                      name='Username'
                      onChange={handleChange}
                      required
                      placeholder='Enter a Username'
                    />
                    <p style={{ color: 'red' }}>{errors.Username}</p>
                  </Form.Group>

                  <Form.Group controlId='formName' className='reg-form-inputs'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type='text'
                      value={values.FirstName}
                      name='FirstName'
                      onChange={handleChange}
                    />
                    <p style={{ color: 'red' }}>{errors.FirstName}</p>
                  </Form.Group>

                  <Form.Group controlId='formPassword' className='reg-form-inputs'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      value={values.Password}
                      name='Password'
                      onChange={handleChange}
                      required
                      minLength='6'
                      placeholder='Your Password must be 6 or more characters'
                    />
                    <p style={{ color: 'red' }}>{errors.Password}</p>
                  </Form.Group>

                  <Form.Group controlId='Email' className='reg-form-inputs'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type='email'
                      value={values.Email}
                      name='Email'
                      onChange={handleChange}
                      required
                      placeholder='Enter your Email address'
                    />
                    <p style={{ color: 'red' }}>{errors.Email}</p>
                  </Form.Group>
                  <Form.Group controlId='updateBirthday'>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type='date'
                      name='Birthday'
                      value={values.Birthday}
                      onChange={handleChange}
                    ></Form.Control>
                    <p style={{ color: 'red' }}>{errors.Birthday}</p>
                  </Form.Group>

                  <Button variant='primary' type='submit' onClick={handleSubmit}>
                    Submit
                  </Button>
                  <p></p>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  )

  RegistrationView.propTypes = {
    regiser: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired
    })
  }
}
