import React from 'react';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'Description 1...', ImagePath: 'tbd1.jpg', Genre: 'Science-Fiction' },
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'Description 2...', ImagePath: 'tbd2.jpg', Genre: 'Drama' },
        { _id: 3, Title: 'Gladiator', Description: 'Description 3...', ImagePath: 'tbd3.jpg', Genre: 'Action/Adventure' }
      ],
      selectedMovie: null //initial value is null until movie card is selected
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) return <div className="main-view"> This list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}