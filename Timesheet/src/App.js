import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [trabajadores, setTrabajadores] = useState([]);
    const [horas, setHoras] = useState({
        trabajador_id: '',
        fecha: '',
        horas_trabajadas: '',
        horas_extras: ''
    });

    useEffect(() => {
        // Obtener trabajadores
        axios.get('http://localhost:3001/trabajadores')
            .then(response => setTrabajadores(response.data))
            .catch(error => console.error('Error al obtener los trabajadores:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHoras({
            ...horas,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Enviar horas trabajadas
        axios.post('http://localhost:3001/horas', horas)
            .then(response => {
                alert('Horas registradas correctamente');
                setHoras({
                    trabajador_id: '',
                    fecha: '',
                    horas_trabajadas: '',
                    horas_extras: ''
                });
            })
            .catch(error => {
                alert('Error al registrar horas');
                console.error(error);
            });
    };

    return (
        <div>
            <h1>Registro de Horas de Trabajo</h1>
            <form onSubmit={handleSubmit}>
                <select
                    name="trabajador_id"
                    value={horas.trabajador_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona un trabajador</option>
                    {trabajadores.map(trabajador => (
                        <option key={trabajador.id} value={trabajador.id}>
                            {trabajador.nombre} {trabajador.apellido}
                        </option>
                    ))}
                </select>
                <br />
                <input
                    type="date"
                    name="fecha"
                    value={horas.fecha}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type="number"
                    name="horas_trabajadas"
                    value={horas.horas_trabajadas}
                    onChange={handleChange}
                    placeholder="Horas trabajadas"
                    required
                />
                <br />
                <input
                    type="number"
                    name="horas_extras"
                    value={horas.horas_extras}
                    onChange={handleChange}
                    placeholder="Horas extras"
                    required
                />
                <br />
                <button type="submit">Añadir Horas</button>
            </form>
        </div>
    );
}

export default App;
