import React from 'react';

function UserInfo({ email, name }) {
  return (
    <>
      <h2>Your Info</h2>
      <p>Username: {name}</p>
      <p>Email: {email}</p>
    </>
  )
}

export default UserInfo