import React from 'react';
import PropTypes from 'prop-types';
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
    const { movie, onBackClick } = this.props;

    if (!movies) return null;

    return (
      <Container className="container movie-view">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <div className="movie-poster">
                  <img variant="top" src={movie.ImagePath} />
                </div>
                <Card.Title>
                  <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                  </div>
                </Card.Title>

                <Card.Text>
                  <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                  </div>
                </Card.Text>
                <Card.Text>
                  <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre}</span>
                  </div>
                </Card.Text>
                <Button onClick={() => { onBackClick(null); }}>Back</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }



}