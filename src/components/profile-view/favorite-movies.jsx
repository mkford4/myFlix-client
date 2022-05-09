import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Card, Row, Col, Figure } from 'react-bootstrap';
import './profile-view.scss';

function FavoriteMovies({ favoriteMovieList }, movies) {
  const removeFav = (id) => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.delete(`https://bechflix.herokuapp.com/users/${user}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }


  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <h2>Favorite Movies</h2>
          </Col>
        </Row>
        <Row>
          {favoriteMovieList.map(({ movies }) => {
            return (
              <Col xs={6} md={6} lg={3} key={movies._id}>
                <Figure>
                  <Link to={`/movies/${movies._id}`}>
                    <Figure.Image
                      crossOrigin="anonymous"
                      src={movies.ImagePath}
                      alt={movies.Title}
                    />
                    <Figure.Caption>
                      {movies.Title}
                    </Figure.Caption>
                  </Link>
                </Figure>
                <button variant="danger" onClick={() => removeFav(movies._id)}>
                  Remove
                </button>
              </Col>
            )
          })
          }
        </Row>
      </Card.Body>
    </Card>
  )
}

export default FavoriteMovies