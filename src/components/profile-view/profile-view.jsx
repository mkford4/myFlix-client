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
  /*
const [user, setUser] = userState({
  Username: '',
  Email: '',
  FavoriteMovies: []
})

const favoriteMovieList = movies.filter((movies) => {
  return user.FavoriteMovies.includes(movies._id);
});

const getUser = () => {

}

useEffect(() => {
  let isMounted = true;
  isMounted && getUser();
  return () => {
    isMounted = false;
  }
}, [])

const handleSubmit = (e) => {

}

const removeFav = (id) => {

}

const handleUpdate = (e) => {

};

useEffect{
  () => {

  }, []
} 
*/

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