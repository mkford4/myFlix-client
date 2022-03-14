import React from 'react';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: '...', ImagePath: '...' },
        { _id: 2, Title: 'The Shawshank Redemption', Description: '...', ImagePath: '...' },
        { _id: 3, Title: 'Gladiator', Description: '...', ImagePath: '...' }
      ]
    }
  }

  render() {
    const { movies } = this.state;
    if (movies.length === 0) return <div className="main-view"> This list is empty!</div>;

    return (
      <div className="main-view">
        {movies.map((movie) => { <div key={movie._id}>{movie.Title}</div> })}
      </div>
    );
  }
}