const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

// Middleware para manejar el cuerpo de las solicitudes
app.use(express.json());
app.use(cors());  // Para permitir solicitudes desde diferentes orígenes

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestion_horas',  // Cambia esto si tu base de datos tiene otro nombre
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Ruta para obtener todos los trabajadores
app.get('/api/trabajadores', (req, res) => {
  const query = 'SELECT * FROM trabajadores';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener trabajadores:', err);
      return res.status(500).json({ error: 'Error al obtener los trabajadores' });
    }
    res.json(results);
  });
});

// Ruta para agregar horas trabajadas
app.post('/api/agregar-horas', (req, res) => {
  const { trabajador_id, fecha, horas_trabajadas, horas_extras } = req.body;

  if (!trabajador_id || !fecha || !horas_trabajadas) {
    return res.status(400).json({ error: 'Faltan datos en el formulario' });
  }

  const query = `
    INSERT INTO horas_trabajadas (trabajador_id, fecha, horas_trabajadas, horas_extras)
    VALUES (?, ?, ?, ?)
  `;
  const values = [trabajador_id, fecha, horas_trabajadas, horas_extras || 0];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al insertar las horas trabajadas:', err);
      return res.status(500).json({ error: 'Error al agregar las horas trabajadas' });
    }
    res.status(200).json({ message: 'Horas agregadas correctamente' });
  });
});

// Ruta para obtener todas las horas trabajadas
app.get('/api/horas-trabajadas', (req, res) => {
  const query = 'SELECT * FROM horas_trabajadas';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener horas trabajadas:', err);
      return res.status(500).json({ error: 'Error al obtener las horas trabajadas' });
    }
    res.json(results);
  });
});

// Ruta para validar horas (eliminar horas de un trabajador)
app.delete('/api/validar-horas', (req, res) => {
  const { trabajador_id } = req.body;

  if (!trabajador_id) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const query = 'DELETE FROM horas_trabajadas WHERE trabajador_id = ?';
  connection.query(query, [trabajador_id], (err, results) => {
    if (err) {
      console.error('Error al eliminar horas trabajadas:', err);
      return res.status(500).json({ error: 'Error al eliminar las horas trabajadas' });
    }
    res.status(200).json({ message: 'Horas validadas (eliminadas) correctamente' });
  });
});

// Iniciar el servidor en el puerto 3001
app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});
