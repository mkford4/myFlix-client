import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap/';
import { Link } from "react-router-dom";

import "./profile-view.scss";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";

export function ProfileView({ movies, onUpdatedUserInfo }) {

  const [user, setUser] = userState({
    Username: '',
    Email: '',
    FavoriteMovies: []
  })

  const [updatedUser, setUpdatedUser] = setState({});

  const favoriteMovieList = movies.filter((movies) => {
    return user.FavoriteMovies.includes(movies._id);
  });

  const getUser = () => {
    axios.get('https://bechflix.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('https://bechflix.herokuapp.com/users/${user.Username}',
      updatedUser)
      .then(response => {
        setUserData(response.data);
        alert('Profile successfully updated');
      })
      .catch(e => {
        console.log(e);
      });
  }

  const removeFav = (id) => {
    axios.delete('https://bechflix.herokuapp.com/users/${user.Username}/movies/${id}')
      .then(() => {
        setFavoriteMovieList(favoriteMovieList.filter(movie => movie._id != id));
      })
      .catch(e => {
        console.log(e);
      });
  }

  const handleUpdate = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    let isMounted = true;
    isMounted && getUser();
    return () => {
      isMounted = false;
    }
  }, [])


  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
            </Card.Body>
          </Card>
        </Col>
      </Row>


      <FavoriteMovies favoriteMovieList={favoriteMovieList} />
    </Container>
  )

}