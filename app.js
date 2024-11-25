const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Archivo para conectar a MySQL

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Ruta para recibir las respuestas de la encuesta
app.post('/api/submit-survey', (req, res) => {
    const question1 = req.body.question1;
    const question2 = req.body.question2;

    if (!question1 || !question2) {
        return res.status(400).json({ message: 'Todas las respuestas son obligatorias.' });
    }

    const query = 'INSERT INTO surveys (question, answer) VALUES (?, ?), (?, ?)';
    db.query(query, ['¿Qué opina de nuestro producto?', question1, '¿Recomendaría nuestro servicio?', question2], (err, results) => {
        if (err) {
            console.error('Error guardando las respuestas:', err.message);
            return res.status(500).json({ message: 'Error guardando las respuestas en la base de datos.' });
        }
        res.status(201).json({ message: 'Respuestas guardadas exitosamente.' });
    });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
