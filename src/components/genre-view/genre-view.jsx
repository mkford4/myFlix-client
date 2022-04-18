import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Card, Button, Row } from 'react-bootstrap/';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick, movies } = this.props;

    return (
      <Container fluid>
        <Card>
          <Card.Body>
            <Card.Title>Genre</Card.Title>
            <Card.Text>
              <span className="label">Name: </span>
              <span className="value">{genre.Name}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Description: </span>
              <span className="value">{genre.Description}</span>
            </Card.Text>

            <Button variant="seconday" onClick={() => { onBackClick(); }}>
              Back
            </Button>
          </Card.Body>
        </Card>
        <Row>
          {movies.map(movie => (
            <Card className="" key={movie._id} >
              <Card.Img
                className=""
                variant="top"
                src={movie.ImagePath} />
              <Card.Body>
                <Card.Title className="">
                  {movie.Title}
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    );
  }
}

GenreView.proptypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
};