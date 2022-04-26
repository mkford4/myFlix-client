import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import "./movie-view.scss";
import "../profile-view/favorite-movies"

import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap/';

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
      FavoriteMovies: [],
    };
  }
  // add keyboard key press event listener
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }
  //remove keypress
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  addFavorite(movie) {
    let user = localStorage.getItem('user')
    let token = localStorage.getItem('token');
    let url = `https://bechflix.herokuapp.com/users/${user}/movies/${movie._id}`;

    axios.post(url, "", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        //history.back();
        alert('This movie has been added to your Favorites!');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;


    return (
      <Container className="container movie-view">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <div className="movie-poster">
                  <img crossOrigin="anonymous" variant="top" src={movie.ImagePath} style={{ width: '75%' }} />
                </div>
                <br />
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
                <Button
                  variant="secondary"
                  onClick={() => { onBackClick(null); }}>
                  Back
                </Button>
                <Button
                  className="btn-main"
                  label="+ Add"
                  onClick={() => {
                    this.addFavorite(movie);
                  }}>
                  Favorite
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }



}