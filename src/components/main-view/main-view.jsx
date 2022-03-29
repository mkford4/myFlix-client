import React from 'react';
import axios from 'axios';
import { Col, Row, Container } from "react-bootstrap/";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null, //initial value is null until movie card is selected
      user: null
    };
  }

  componentDidMount() { //connecting myFlix API with Axios
    axios.get('https://bechflix.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegistration(registration) {
    this.setState({
      registration
    });
  }

  render() {
    const { movies, selectedMovie, registration, user } = this.state;

    //if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    //if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) return <div className="main-view"> This list is empty!</div>;

    return (
      <Container>
        <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView
                  movie={selectedMovie}
                  onBackClick={newSelectedMovie => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            )
            : movies.map(movie => (
              <Col md={3}>
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onMovieClick={newSelectedMovie => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))
          }
        </Row>
      </Container>
    );
  }
}