import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VerHoras() {
    const [horas, setHoras] = useState([]);

    useEffect(() => {
        const fetchHoras = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/horas');
                setHoras(response.data); // Guardar los datos en el estado
            } catch (error) {
                console.error('Error al obtener las horas:', error);
            }
        };

        fetchHoras();
    }, []);  // Solo ejecuta esto una vez cuando el componente se monta

    return (
        <div>
            <h2>Horas Trabajadas</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID Trabajador</th>
                        <th>Fecha</th>
                        <th>Horas Trabajadas</th>
                        <th>Horas Extras</th>
                    </tr>
                </thead>
                <tbody>
                    {horas.map((hora) => (
                        <tr key={hora.id}>
                            <td>{hora.trabajadorId}</td>
                            <td>{hora.fecha}</td>
                            <td>{hora.horasTrabajadas}</td>
                            <td>{hora.horasExtras}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VerHoras;
