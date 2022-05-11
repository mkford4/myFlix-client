import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap/';

import "./profile-view.scss";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";

export function ProfileView({ user: loggedUser, movies }) {
  const [user, setUser] = useState(null)
  const [updatedUser, setUpdatedUser] = useState({});
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')

  const favoriteMovieList = movies.filter((movies) => {
    return user?.FavoriteMovies.includes(movies._id);
  });

  const getUser = () => {
    axios.get('https://bechflix.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const selectUser = response.data.find(u => u.Username === loggedUser)
        setUser(selectUser)
        setTimeout(() => {
          setLoading(false)
        }, 1000); //loading time set to 1 second
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://bechflix.herokuapp.com/users/${user.Username}`, updatedUser, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUpdatedUser(response.data);
        alert('Profile successfully updated');
      })
      .catch(e => {
        console.log(e);
      });
  }

  const deleteUser = (e) => {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://bechflix.herokuapp.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        alert("Profile deleted");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self'); //returns to main-view
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const handleUpdate = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    let isMounted = true;
    isMounted && getUser();
    return () => {
      isMounted = false;
    }
  }, [])

  if (loading) return <h1>Loading...</h1>

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
              <Button
                variant="danger"
                type="submit"
                onClick={deleteUser}>
                Delete Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser user={user} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FavoriteMovies favoriteMovieList={favoriteMovieList} />
    </Container>
  )

}