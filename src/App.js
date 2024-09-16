// App.js
import React from 'react';
import SearchMovies from './SearchMovies';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-dark">
        <h1 className="navbar-brand">Buscador de Películas</h1>
      </nav>
      <div className="container mt-4">
        <SearchMovies />
      </div>
    </div>
  );
}

export default App;

