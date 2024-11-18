const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // default user for XAMPP
    password: '', // leave empty if no password is set
    database: 'attendance_system'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to XAMPP MySQL database');
});

module.exports = connection;
