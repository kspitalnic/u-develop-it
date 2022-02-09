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

// db.query(`SELECT * FROM participants`, (err, rows) => {
//     console.log(rows);
// });

// Delete a candidate
// db.query(`DELETE FROM participants WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });

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