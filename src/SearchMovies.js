//SearchMovies.js

import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails'; // Importa el componente MovieDetails

const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // Estado para la película seleccionada
  const [movieDetails, setMovieDetails] = useState(null); // Estado para los detalles de la película
  const [searchPerformed, setSearchPerformed] = useState(false); // Controla si ya se ha realizado una búsqueda

  const searchMovies = async (e) => {
    e.preventDefault();
    const API_KEY = '8744076d934883e49154c10ce649019c';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
      setSelectedMovie(null); // Resetea la película seleccionada si hay una nueva búsqueda
      setMovieDetails(null); // Resetea los detalles de la película
      setSearchPerformed(true); // Marca que ya se ha realizado la búsqueda
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    const API_KEY = '8744076d934883e49154c10ce649019c';
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;

    try {
      const [movieDetailsResponse, creditsResponse] = await Promise.all([
        axios.get(movieDetailsUrl),
        axios.get(creditsUrl),
      ]);

      setMovieDetails({
        ...movieDetailsResponse.data,
        cast: creditsResponse.data.cast.slice(0, 5), // Mostrar los 5 actores principales
        director: creditsResponse.data.crew.find((member) => member.job === 'Director'),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    fetchMovieDetails(movie.id); // Llama a la API para obtener detalles
  };

  const resetSearch = () => {
    setQuery('');
    setMovies([]);
    setSelectedMovie(null);
    setMovieDetails(null);
    setSearchPerformed(false); // Restablece el estado de búsqueda
  };

  return (
    <div>
      {!selectedMovie && (
        <form onSubmit={searchMovies} className="form">
          <input
            type="text"
            name="query"
            placeholder="Busca una película"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-control"
          />
          {!searchPerformed && (
            <button type="submit" className="btn btn-primary mt-3">
              Buscar
            </button>
          )}
          {searchPerformed && (
            <button type="button" onClick={resetSearch} className="btn btn-secondary mt-3">
              Resetear
            </button>
          )}
        </form>
      )}

      {selectedMovie && movieDetails && (
        <MovieDetails movie={movieDetails} onClose={resetSearch} />
      )}

      {!selectedMovie && (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchMovies;
