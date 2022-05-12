import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Button, Row, Col } from 'react-bootstrap/';

export class GenreView extends React.Component {

  render() {

    const { onBackClick, movies } = this.props;
    const genre = movies[0].Genre;

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

            <Button variant="secondary" onClick={() => { onBackClick(); }}>
              Back
            </Button>
          </Card.Body>
        </Card>
        <Row>
          {movies.map(movie => (
            <Col md={6} sm={3} key={movie._id}>
              <Card className="">
                <Card.Img
                  crossOrigin="anonymous"
                  className=""
                  variant="top"
                  src={movie.ImagePath} />
                <Card.Body>
                  <Card.Title className="">
                    {movie.Title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container >
    );
  }
}

GenreView.proptypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
};