const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'LuCas1234@',
    database: 'survey_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a MySQL:', err.message);
        return;
    }
    console.log('Conexión exitosa a MySQL.');
});

module.exports = connection;
