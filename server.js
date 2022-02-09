const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');

// Express middleware 
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
const db = mysql.createConnection(
    {
        host: 'localhost',
        //Your mySQL username, 
        user: 'root',
        //Your mySQL password
        password:'rootpassword',
        database:'myReportSamples'
    },
    console.log('Connected to the my report study database')
)

// Get all participants
app.get('/api/participants', (req, res) => {
    const sql = `SELECT * FROM participants`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

  // Get a single participant
app.get('/api/participant/:id', (req, res) => {
    const sql = `SELECT * FROM participants WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });

// Delete a candidate
app.delete('/api/participant/:id', (req, res) => {
    const sql = `DELETE FROM participants WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Participant not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });

// Create a candidate
const sql = `INSERT INTO participants (code, participant, date, time) 
              VALUES (?,?,?,?)`;
const params = ['K00106', 'K001', '1/5/2021', 'S1'];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});


app.get('/', (req, res) => {
    res.json({
        message:'Hello World'
    });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});