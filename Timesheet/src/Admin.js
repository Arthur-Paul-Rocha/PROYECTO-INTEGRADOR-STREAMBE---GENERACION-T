import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Admin = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [horasTrabajadas, setHorasTrabajadas] = useState([]);

  // Obtener los trabajadores
  useEffect(() => {
    axios.get('http://localhost:3001/api/trabajadores')
      .then(response => setTrabajadores(response.data))
      .catch(error => console.error('Error al obtener trabajadores:', error));
  }, []);

  // Obtener las horas trabajadas
  useEffect(() => {
    axios.get('http://localhost:3001/api/horas-trabajadas')
      .then(response => setHorasTrabajadas(response.data))
      .catch(error => console.error('Error al obtener horas trabajadas:', error));
  }, []);

  // Función para validar horas (eliminar horas trabajadas de un trabajador)
  const validarHoras = (trabajador_id) => {
    axios.delete('http://localhost:3001/api/validar-horas', {
      data: { trabajador_id },
    })
    .then(() => {
      // Después de eliminar, actualizar las tablas
      setHorasTrabajadas(horasTrabajadas.filter(hora => hora.trabajador_id !== trabajador_id));
      alert('Horas validadas (eliminadas) correctamente');
    })
    .catch(error => console.error('Error al validar horas:', error));
  };

  return (
    <div>
      <h2>Administrar Trabajadores</h2>

      <h3>Trabajadores</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {trabajadores.map((trabajador) => (
            <tr key={trabajador.id}>
              <td>{trabajador.id}</td>
              <td>{trabajador.nombre}</td>
              <td>
                <button onClick={() => validarHoras(trabajador.id)}>Validar Horas</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Horas Trabajadas</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Trabajador ID</th>
            <th>Fecha</th>
            <th>Horas Trabajadas</th>
            <th>Horas Extras</th>
          </tr>
        </thead>
        <tbody>
          {horasTrabajadas.map((hora) => (
            <tr key={hora.id}>
              <td>{hora.id}</td>
              <td>{hora.trabajador_id}</td>
              <td>{hora.fecha}</td>
              <td>{hora.horas_trabajadas}</td>
              <td>{hora.horas_extras}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
