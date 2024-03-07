const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "register"
  });

  app.post('/register', (req, res) => {
    console.log(req.body);
    const insertSql = "INSERT INTO login (name, last, father, `date`, email, password, institute, specialist, issuey, vkLink, telegramLink, instagramLink, facebookLink) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const selectSql = "SELECT * FROM login WHERE email = ? AND password = ?";

    db.query(insertSql, [req.body.name, req.body.last, req.body.father, req.body.date, req.body.email, req.body.password, 
      req.body.institute, req.body.specialist, req.body.issuey, req.body.vkLink, req.body.telegramLink, req.body.instagramLink, req.body.facebookLink], (err, insertResult) => {
        if (err) {
            return res.status(500).json({ error: 'Error' });
        }

        db.query(selectSql, [req.body.email, req.body.password], (err, selectResult) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }

            if (selectResult.length > 0) {
                return res.status(200).json({ message: 'Login Successfully' });
            } else {
                return res.status(200).json({ message: 'Failed' });
            }
        });
    });
});

app.post('/login', (req, res) => {
  console.log(req.body);
  const selectSql = "SELECT * FROM login WHERE email = ? AND password = ?";
    
  db.query(selectSql, [req.body.email, req.body.password], (err, selectResult) => {
    if (err) {
      return res.status(500).json({ error: 'Error' });
    }

    if (selectResult.length > 0) {
      const name = selectResult[0].name; // Assuming you have a 'name' column in the 'login' table
      return res.status(200).json({ message: 'Login Successfully', name });
    } else {
      return res.status(200).json({ message: 'Failed' });
    }
  });
});

app.get('login', (req, res) => {
  const selectSql = "SELECT name,img FROM login WHERE name = ? AND img = ?";

  db.query(selectSql, [req.query.email], (err, selectResult) => {
    if (err) {
      return res.status(500).json({ error: 'Error' });
    }
    
    if (selectResult.length > 0) {
      const userProfile = selectResult[0]; // Assuming the query returns only one row
      return res.status(200).json(userProfile);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  });
});

app.listen(8081, () => {
    console.log("listening");
})