import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    navigate('/login-usuario');
  };

  const handleAdminLogin = () => {
    navigate('/login-admin');
  };

  return (
    <div>
      <h1>Bienvenido a la Gestión de Horas</h1>
      <Button onClick={handleUserLogin} variant="contained" color="primary">
        Ingresar como Usuario
      </Button>
      <Button onClick={handleAdminLogin} variant="contained" color="secondary" style={{ marginLeft: '20px' }}>
        Ingresar como Administrador
      </Button>
    </div>
  );
}

export default HomePage;
