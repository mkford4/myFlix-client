import React from 'react';
import { Form, Button } from 'react-bootstrap';

function UpdateUser({ user, handleSubmit, handleUpdate }) {
  return (

    <Form>
      <h2>Update Your Info</h2>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'
          name='Username'
          defaultValue={user.Username}
          onBlur={handleUpdate} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          name='Password'
          defaultValue={user.Password}
          onBlur={handleUpdate} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type='email'
          name='Email'
          defaultValue={user.Email}
          onBlur={handleUpdate} />
      </Form.Group>
      <Button variant='primary' type='submit'
        onClick={handleSubmit}>
        Update
      </Button>
    </Form>
  )
}

export default UpdateUser