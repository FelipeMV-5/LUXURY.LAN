const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3001; // Cambié el puerto a 3001 para evitar conflictos

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'contacto'))); // Para servir archivos estáticos desde la carpeta "contacto"

// Conectar a la base de datos SQLite
const db = new sqlite3.Database(path.join(__dirname, 'contacto', 'citas.db'), (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Conectado a la base de datos de citas.');
    }
});

// Crear la tabla de citas si no existe
db.run(`CREATE TABLE IF NOT EXISTS citas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    email TEXT NOT NULL,
    mensaje TEXT NOT NULL
)`);

// Ruta para servir la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'contacto', 'index.html')); // Aquí debe estar el archivo 'index.html' en la carpeta 'contacto'
});

// Ruta para recibir el formulario y guardar en la base de datos
app.post('/submit-form', (req, res) => {
    const { name, phone, email, message } = req.body;

    const sql = `INSERT INTO citas (nombre, telefono, email, mensaje) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, phone, email, message], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error al guardar la cita");
            return;
        }
        console.log(`Cita guardada con ID: ${this.lastID}`);
        res.send("Cita solicitada con éxito.");
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
