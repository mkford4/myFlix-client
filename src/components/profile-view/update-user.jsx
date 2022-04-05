import React from 'react';
import { Form, Button } from 'react-bootstrap';

function UpdateUser({ handleSubmit, handleUpdate }) {
  return (

    <Form>
      <h2>Update Your Info</h2>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'
          name='Username'
          defaultValue={user.Username}
          onChange={e => handleUpdate(e)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          name='password'
          defaultValue={user.Password}
          onChange={e => handleUpdate(e)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type='email'
          name='email'
          defaultValue={user.Email}
          onChange={e => handleUpdate(e.target.value)} />
      </Form.Group>
      <Button variant='primary' type='submit'
        onClick={handleSubmit}>
        Update
      </Button>
    </Form>
  )
}

export default UpdateUser