import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Card, Row, Col, Figure } from 'react-bootstrap';
import './profile-view.scss';

function FavoriteMovies({ favoriteMovieList }) {
  const [movieList, setMovieList] = React.useState(favoriteMovieList)

  const removeFav = (id) => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.delete(`https://bechflix.herokuapp.com/users/${user}/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(response);
        alert('Movie has been removed');
        setMovieList(movieList.filter(movie => movie._id != id))
      })
      .catch(e => {
        console.log(e);
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
          {movieList.map(({ ImagePath, Title, _id }) => {
            return (
              <Col xs={6} md={6} lg={3} key={_id}>
                <Figure>
                  <Link to={`/movies/${_id}`}>
                    <Figure.Image
                      crossOrigin="anonymous"
                      src={ImagePath}
                      alt={Title}
                    />
                    <Figure.Caption>
                      {Title}
                    </Figure.Caption>
                  </Link>
                </Figure>
                <button variant="danger" onClick={() => removeFav(_id)}>
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