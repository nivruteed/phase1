const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Avira@19',
  database: 'myweb'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database!');
});

// API endpoint to create a user
app.post('/api/create-user', (req, res) => {
  const { name, email, address, password } = req.body;
  const query = 'INSERT INTO users (name, email, address, password) VALUES (?, ?, ?, ?)';
  
  db.query(query, [name, email, address, password], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('User created successfully!');
  });
});

// API endpoint to schedule a meeting
app.post('/api/schedule-meeting', (req, res) => {
  const { topic, numberOfPeople, startTime } = req.body;
  const query = 'INSERT INTO meetings (topic, numberOfPeople, startTime) VALUES (?, ?, ?)';
  
  db.query(query, [topic, numberOfPeople, startTime], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Meeting scheduled successfully!');
  });
});

// Serve static files from Angular app
app.use(express.static('dist/your-angular-app-name'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/your-angular-app-name/index.html');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
