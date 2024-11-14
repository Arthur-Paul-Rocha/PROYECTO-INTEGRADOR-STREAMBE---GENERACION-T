import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Usuario = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [trabajadorId, setTrabajadorId] = useState('');
  const [fecha, setFecha] = useState('');
  const [horasTrabajadas, setHorasTrabajadas] = useState('');
  const [horasExtras, setHorasExtras] = useState('');

  // Cargar los trabajadores cuando el componente se monta
  useEffect(() => {
    axios.get('http://localhost:3001/api/trabajadores')  // Verifica la URL que corresponde en tu servidor
      .then(response => setTrabajadores(response.data))  // Aquí estamos almacenando los trabajadores en el estado
      .catch(error => console.error('Error al cargar los trabajadores:', error));
  }, []);

  // Función para manejar el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!trabajadorId || !fecha || !horasTrabajadas) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const data = {
      trabajador_id: trabajadorId,
      fecha,
      horas_trabajadas: horasTrabajadas,
      horas_extras: horasExtras,
    };

    axios.post('http://localhost:3001/api/agregar-horas', data)
      .then(response => {
        alert('Horas agregadas correctamente');
      })
      .catch(error => {
        console.error('Error al agregar horas:', error);
        alert('Error al agregar horas');
      });
  };

  return (
    <div>
      <h1>Agregar horas trabajadas</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Selecciona el trabajador:</label>
          <select 
            value={trabajadorId} 
            onChange={(e) => setTrabajadorId(e.target.value)}
          >
            <option value="">Selecciona un trabajador</option>
            {trabajadores.map(trabajador => (
              <option key={trabajador.id} value={trabajador.id}>
                {trabajador.nombre} {trabajador.apellido}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Fecha:</label>
          <input 
            type="date" 
            value={fecha} 
            onChange={(e) => setFecha(e.target.value)} 
          />
        </div>
        <div>
          <label>Horas trabajadas:</label>
          <input 
            type="number" 
            value={horasTrabajadas} 
            onChange={(e) => setHorasTrabajadas(e.target.value)} 
          />
        </div>
        <div>
          <label>Horas extras:</label>
          <input 
            type="number" 
            value={horasExtras} 
            onChange={(e) => setHorasExtras(e.target.value)} 
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default Usuario;
