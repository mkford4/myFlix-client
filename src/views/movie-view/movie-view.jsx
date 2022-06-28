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
                  <img crossOrigin="anonymous" variant="top" src={movie.ImagePath} style={{ width: '100%' }} />
                </div>
                <br />
                <Card.Title>
                  <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                    <Button
                      className="btn-main"
                      label="+ Add"
                      onClick={() => {
                        this.addFavorite(movie);
                      }}>
                      ★
                    </Button>
                  </div>
                </Card.Title>
                <br></br>

                <div className="movie-description">
                  <span className="label">Description: </span>
                  <span className="value">{movie.Description}</span>
                </div>

                <br></br>

                <div className="movie-director">
                  <Link to={`/directors/${movie.Director.Name}`}>Director: </Link>
                  <span className="value">[{movie.Director.Name}] {movie.Director.Bio}</span>
                </div>

                <br />

                <div className="movie-genre">
                  <Link to={`/genres/${movie.Genre.Name}`}>Genre: </Link>
                  <span className="value">[{movie.Genre.Name}] {movie.Genre.Description}</span>
                </div>


                <br />
                <Button
                  variant="secondary"
                  onClick={() => { onBackClick(null); }}>
                  Back
                </Button>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }



}