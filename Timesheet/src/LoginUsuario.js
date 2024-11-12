import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginUsuario() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí deberías agregar la lógica para validar el login (puede ser con una API)
    if (email && password) {
      // Si el login es exitoso, navegar a la página de usuario
      navigate('/usuario');
    } else {
      alert('Por favor ingrese un correo y una contraseña válidos.');
    }
  };

  return (
    <div>
      <h2>Iniciar sesión como Usuario</h2>
      <TextField
        label="Correo Electrónico"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        label="Contraseña"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button onClick={handleLogin} variant="contained" color="primary">
        Iniciar Sesión
      </Button>
    </div>
  );
}

export default LoginUsuario;
