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