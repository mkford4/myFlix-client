import React from 'react';

import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap/';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    if (!movies) return null;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }

  /* add keyboard key press event listener
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
} */

}