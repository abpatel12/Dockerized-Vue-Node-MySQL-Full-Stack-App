const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'testdb'
});

app.get('/api', (req, res) => {
  db.query('SELECT message FROM messages LIMIT 1', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

app.listen(3000, () => console.log('Backend running on port 3000'));
