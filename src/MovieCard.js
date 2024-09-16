//MovieCard.js

import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="card movie-card" onClick={() => onClick(movie)}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="card-img-top"
        alt={movie.title}
      />
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        {/* Afegim el botó See More */}
        <button className="btn btn-primary" onClick={() => onClick(movie)}>See More</button>
      </div>
    </div>
  );
};

export default MovieCard;
