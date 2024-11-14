import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Admin from './Admin';
import User from './User';
import './App.css';

function App() {
  const [trabajadores, setTrabajadores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/trabajadores')
      .then(response => {
        setTrabajadores(response.data);
      })
      .catch(error => {
        console.error('Error al obtener trabajadores:', error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin trabajadores={trabajadores} />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
