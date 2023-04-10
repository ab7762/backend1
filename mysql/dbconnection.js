const mysql = require('mysql'); // Noden mysql -kirjasto

// Yhteys sijoitetaan muuttujaan conn
const conn = mysql.createConnection({
  user: 'root',
  password: 'password',
  database: 'nodemysql',
});

module.exports = conn;
