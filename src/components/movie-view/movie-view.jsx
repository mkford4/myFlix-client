import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import "./movie-view.scss";

import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap/';

export class MovieView extends React.Component {

  // add keyboard key press event listener
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  //componentDidUpdate() { goes here }

  //remove keypress
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick, user } = this.props;

    const addFav = (id) => {
      axios.post(`https://bechflix.herokuapp.com/users/${user.Username}/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => {
          setFavoriteMovieList(favoriteMovieList.filter(movie => movie._id != id));
        })
        .catch(e => {
          console.log(e);
        });
    }
    //if (!movies) return null;

    return (
      <Container className="container movie-view">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <div className="movie-poster">
                  <img variant="top" src={movie.ImagePath} style={{ width: '100%' }} />
                </div>
                <Card.Title>
                  <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                  </div>
                </Card.Title>


                <div className="movie-description">
                  <span className="label">Description: </span>
                  <span className="value">{movie.Description}</span>
                </div>


                <div className="movie-director">
                  <span className="label">Director: </span>
                  <span className="value">[{movie.Director.Name}] {movie.Director.Bio}</span>
                </div>

                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link">Director</Button>
                </Link>

                <div className="movie-genre">
                  <span className="label">Genre: </span>
                  <span className="value">[{movie.Genre.Name}] {movie.Genre.Description}</span>
                </div>

                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">Genre</Button>
                </Link>
                <br />
                <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
                <Button className="btn-main" onClick={addFav}>Favorite</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }



}