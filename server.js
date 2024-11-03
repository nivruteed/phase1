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
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'User created successfully!' });
    });
});

// API endpoint for user login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful!', user: results[0] });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

// API endpoint to schedule a meeting
app.post('/api/schedule-meeting', (req, res) => {
    const { topic, numberOfPeople, startTime, userId } = req.body;
    const query = 'INSERT INTO meetings (topic, numberOfPeople, startTime, userId) VALUES (?, ?, ?, ?)';

    db.query(query, [topic, numberOfPeople, startTime, userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Meeting scheduled successfully!' });
    });
});

// API endpoint to fetch all meetings
app.get('/api/meetings', (req, res) => {
    const query = 'SELECT * FROM meetings';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

// API endpoint to update a meeting
app.put('/api/meetings/:id', (req, res) => {
    const { id } = req.params;
    const { topic, numberOfPeople, startTime } = req.body;
    const query = 'UPDATE meetings SET topic = ?, numberOfPeople = ?, startTime = ? WHERE id = ?';

    db.query(query, [topic, numberOfPeople, startTime, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Meeting updated successfully!' });
    });
});

// API endpoint to delete a meeting
app.delete('/api/meetings/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM meetings WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Meeting deleted successfully!' });
    });
});

// Serve static files from Angular app
app.use(express.static('dist/myweb'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/myweb/index.html');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
