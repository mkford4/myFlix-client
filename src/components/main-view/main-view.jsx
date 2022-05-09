import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import { Col, Row, Container, Button } from "react-bootstrap/";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { NavBar } from '../navbar/navbar';
import { ProfileView } from '../profile-view/profile-view';

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
    const { movies, user } = this.state;

    return (
      <>
        <NavBar user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Router>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => {
                    if (!user)
                      return (
                        <Col>
                          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                      )
                    if (movies.length === 0) return <div className="main-view" />;
                    return movies.map(m => (
                      <Col md={3} sm={6} key={m._id}>
                        <MovieCard movie={m} />
                      </Col>
                    ))
                  }}
                />

                <Route
                  path="/register"
                  render={() => {
                    if (user) return <Redirect to='/' />
                    return (
                      <Col lg={8} md={8}>
                        <RegistrationView />
                      </Col>
                    )
                  }}
                />

                <Route
                  path="/movies/:movieId"
                  render={({ match, history }) => {
                    if (!user)
                      return (
                        <Col>
                          <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                        </Col>
                      )
                    if (movies.length === 0) return <div className='main-view' />
                    return (
                      <Col md={8}>
                        <MovieView
                          movie={movies.find((m) => m._id === match.params.movieId)}
                          onBackClick={() => history.goBack()}
                        />
                      </Col>
                    )
                  }}
                />

                <Route
                  path="/genres/:name"
                  render={({ match, history }) => {
                    if (!movies) return <div className="main-view" />;
                    if (!user)
                      return (
                        <Col>
                          <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                        </Col>
                      )
                    return <Col md={8}>
                      <GenreView
                        genre={match.params.name}
                        movies={
                          movies.filter(m => m.Genre.Name === match.params.name)
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  }} />


                <Route
                  path="/directors/:name"
                  render={({ match, history }) => {
                    if (movies.length === 0) return <div className="main-view" />;
                    if (!user)
                      return (
                        <Col>
                          <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                        </Col>
                      )
                    return <Col md={8}>
                      <DirectorView
                        director={match.params.name}
                        movies={
                          movies.filter(m => m.Director.Name === match.params.name)
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  }} />

                <Route
                  path="/users/:username"
                  render={({ history, match }) => {
                    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    return <Col md={8}>
                      <ProfileView
                        history={history}
                        movies={movies}
                        user={match.params.username} />
                    </Col>
                  }} />
              </Switch>
            </Router>

          </Row>
        </Container>
      </>
    )
  }
}

