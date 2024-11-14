import React from 'react';
import './App.css';

function HomePage() {
  return (
    <div>
      <h1>Bienvenido al Timesheet de Mcdonalds</h1>
      <p>Seleccione una opción:</p>
      <button
        onClick={() => window.location.href = "/admin"}
      >
        Ir al Panel del Administrador
      </button>
      <button
        onClick={() => window.location.href = "/user"}
      >
        Ingresar Horas trabajadas
      </button>
    </div>
  );
}

export default HomePage;
