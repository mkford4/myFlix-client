import React from 'react';
import { Link } from "react-router-dom";
import { Card, Row, Col, Figure } from 'react-bootstrap';
import './profile-view.scss';

function FavoriteMovies({ favoriteMovieList }) {
  const removeFav = (id) => {
    let token = localStorage.getItem('token');
    let url = `https://bechflix.herokuapp.com/users/${localStorage.getItem('user')}/movies/${id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={2}>
            <h2>Favorite Movies</h2>
          </Col>
        </Row>
        <Row>
          {favoriteMoviesList.map(({ ImagePath, Title, _id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={_id}>
                <Figure>
                  <Link to={`/movies/${movies._id}`}>
                    <Figure.Image
                      src={ImagePath}
                      alt={Title}
                    />
                    <Figure.Caption>
                      {Title}
                    </Figure.Caption>
                  </Link>
                </Figure>
                <button variant="seconday" onClick={() => removeFav(movies._id)}>
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