//MovieDetails.js

import React from 'react';
import './MovieDetails.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registra els components de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Base URL per a les imatges
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original/';

const MovieDetails = ({ movie, onClose }) => {
  if (!movie) return <div>Loading...</div>;

  const { title, overview, release_date, runtime, director, vote_average, cast, poster_path } = movie;

  // Datos para la gráfica de valoracions
  const data = {
    labels: ['Valoració'],
    datasets: [
      {
        label: 'Valoració',
        data: [vote_average],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barThickness: 40, // Controla el grosor de la barra
      }
    ]
  };

  // Opcions de la gràfica sense llegenda
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,  // Elimina la llegenda
      },
    },
  };

  return (
    <div className="movie-details-container">
      <div className="movie-details">
        <div>
          <img className="movie-poster" src={`${BASE_IMAGE_URL}${poster_path}`} alt={title} />
          <div className="movie-rating">
            <h3>Valoració</h3>
            <Bar data={data} options={options} />
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{vote_average}</p> {/* Número més gran */}
          </div>
        </div>
        
        <div className="movie-info">
          <h2>{title}</h2>
          <p><strong>Sinopsis:</strong> {overview}</p>
          <p><strong>Data de Lliurament:</strong> {new Date(release_date).toLocaleDateString()}</p>
          <p><strong>Durada:</strong> {runtime} min</p>
          <p><strong>Director:</strong> {director.name}</p>

          <h3>Repartiment:</h3>
          <div className="cast-list">
            {cast && cast.map(actor => (
              <div key={actor.id} className="cast-member">
                {actor.profile_path ? (
                  <img className="cast-photo" src={`${BASE_IMAGE_URL}${actor.profile_path}`} alt={actor.name} />
                ) : (
                  <p>No Image Available</p>
                )}
                <p>{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botó de retorn ara separat de la fitxa */}
      <div className="return-button-container">
        <button onClick={onClose} className="btn btn-secondary">Return</button>
      </div>
    </div>
  );
};

export default MovieDetails;

