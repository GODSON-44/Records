// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());// for handling the request from other servers!! like localhost:5500 etc

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ashish@9835',
    database: 'ashish'
});

db.connect(err => {
    if (err) {
        console.error("Database connection error:", err);
    } else{
        console.log("Connected to MySQL");
    }
});

let table = "bh_one_new";
function getDateTime(){
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0');

        const formatted = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        return formatted;

}


// API route(work only when this program is running)
app.get('/', (req, res) => {                             // Browser only understands get request no web brower for post
    db.query(`select * from ${table};`, (err, results) => {
        if (err) 
            return res.status(500).json({ error: err });

        res.json(results);
    });
    // res.json(res.body);
});



app.get('/post',(req, res)=>{
    console.log(req.body);
    res.send("Connected to server(root)!");
})

// app.post('/post', (req, res) => {
//     console.log(req.body);  // Logs the posted data
//     res.json({ message: 'Data received', data: req.body });
// });

app.post('/post', (req, res) => {
    let pass = req.body;
    let now = getDateTime();//explicit function to get datetime for sql 
    pass.push(now);

  // Insert query
  const query = `INSERT INTO ${table} (name, Roll_num, mob, p_mob, Branch, reason, date_time) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, pass, (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'User added!', insertId: result.insertId });
  });
});




app.listen(4000, () => { // 0.0.0.0 us to run on any host/devices
    console.log('Server running on http://localhost:4000');
});
