import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Button, Row, Col } from 'react-bootstrap/';
import { connect } from 'react-redux';

export class DirectorView extends React.Component {

  render() {
    const { onBackClick, movies } = this.props;
    const director = movies[0].Director;

    return (
      <Container fluid>
        <Card>
          <Card.Body>
            <Card.Title>Director</Card.Title>
            <Card.Text>
              <span className="label">Name: </span>
              <span className="value">{director.Name}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Bio: </span>
              <span className="value">{director.Bio}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Birth Year: </span>
              <span className="value">{director.Birth}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Death: </span>
              <span className="value">{director.Death || '----'}</span>
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
      </Container>
    );
  }
}

DirectorView.proptypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string
  })
};

const mapStateToProps = (state) => {
  const { directors } = state;
  return { directors };
};

export default connect(mapStateToProps)(DirectorView);