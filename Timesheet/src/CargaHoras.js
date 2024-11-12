import React, { useState } from 'react';
import axios from 'axios';

function CargaHoras() {
  const [trabajadorId, setTrabajadorId] = useState('');
  const [fecha, setFecha] = useState('');
  const [horasTrabajadas, setHorasTrabajadas] = useState('');
  const [horasExtras, setHorasExtras] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/horas', {
        trabajador_id: trabajadorId,
        fecha,
        horas_trabajadas: horasTrabajadas,
        horas_extras: horasExtras
      });

      alert('Horas cargadas con éxito');
    } catch (error) {
      console.error(error);
      alert('Error al cargar las horas');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="number" 
        value={trabajadorId} 
        onChange={(e) => setTrabajadorId(e.target.value)} 
        placeholder="ID Trabajador" 
        required 
      />
      <input 
        type="date" 
        value={fecha} 
        onChange={(e) => setFecha(e.target.value)} 
        required 
      />
      <input 
        type="number" 
        step="0.5" 
        value={horasTrabajadas} 
        onChange={(e) => setHorasTrabajadas(e.target.value)} 
        placeholder="Horas Trabajadas" 
        required 
      />
      <input 
        type="number" 
        step="0.5" 
        value={horasExtras} 
        onChange={(e) => setHorasExtras(e.target.value)} 
        placeholder="Horas Extras" 
      />
      <button type="submit">Cargar Horas</button>
    </form>
  );
}

export default CargaHoras;
