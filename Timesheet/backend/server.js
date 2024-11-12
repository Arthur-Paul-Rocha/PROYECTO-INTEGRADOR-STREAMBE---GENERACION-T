const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestion_horas'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión a la base de datos establecida.');
});

// Ruta para obtener todos los empleados
app.get('/trabajadores', (req, res) => {
    db.query('SELECT * FROM trabajadores', (err, results) => {
        if (err) {
            return res.status(500).send('Error al obtener trabajadores');
        }
        res.json(results);
    });
});

// Ruta para insertar horas trabajadas
app.post('/horas', (req, res) => {
    const { trabajador_id, fecha, horas_trabajadas, horas_extras } = req.body;
    
    const query = 'INSERT INTO horas_trabajadas (trabajador_id, fecha, horas_trabajadas, horas_extras) VALUES (?, ?, ?, ?)';
    db.query(query, [trabajador_id, fecha, horas_trabajadas, horas_extras], (err, results) => {
        if (err) {
            console.error('Error al insertar horas:', err);
            return res.status(500).send('Error al insertar horas');
        }
        res.status(201).send('Horas registradas correctamente');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
