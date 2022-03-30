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
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegistration(registration) {
    this.setState({
      registration
    });
  }

  getMovies(token) {
    axios.get('https://bechflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, selectedMovie, registration, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

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
                  onBackClick={() => {
                    this.setSelectedMovie(null);
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
          <Button onClick={() => { this.onLoggedOut() }}>Logout</Button>
        </Row>
      </Container>
    );
  }
}