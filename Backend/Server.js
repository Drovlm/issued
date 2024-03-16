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
    const insertSql = "INSERT INTO login (name, last, father, `date`, email, password, institute, specialist, issuey, img, vkLink, telegramLink, instagramLink, facebookLink) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const selectSql = "SELECT * FROM login WHERE email = ? AND password = ?";
  
    db.query(insertSql, [req.body.name, req.body.last, req.body.father, req.body.date, req.body.email, req.body.password, 
      req.body.institute, req.body.specialist, req.body.issuey, req.body.img, req.body.vkLink, req.body.telegramLink, req.body.instagramLink, req.body.facebookLink], (err, insertResult) => {
      if (err) {
        console.error("Error inserting data into database:", err);
        return res.status(500).json({ error: 'Error inserting data into database' });
      }
  
      db.query(selectSql, [req.body.email, req.body.password], (err, selectResult) => {
        if (err) {
          console.error("Error selecting data from database:", err);
          return res.status(500).json({ error: 'Error selecting data from database' });
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
    const selectSql = "SELECT id, name, img FROM login WHERE email = ? AND password = ?";
      
    db.query(selectSql, [req.body.email, req.body.password], (err, selectResult) => {
      if (err) {
        return res.status(500).json({ error: 'Error' });
      }
  
      if (selectResult.length > 0) {
        const { id, name, img } = selectResult[0]; 
        console.log("User ID:", id); 
        return res.status(200).json({ message: 'Login Successfully', name, img });
      } else {
        return res.status(200).json({ message: 'Failed' });
      }
    });
  });
  

app.get('/login', (req, res) => {
  const selectSql = "SELECT name,img FROM login WHERE name = ? AND img = ?";

  db.query(selectSql, [req.query.email], (err, selectResult) => {
    if (err) {
      return res.status(500).json({ error: 'Error' });
    }
    
    if (selectResult.length > 0) {
      const userProfile = selectResult[0];
      return res.status(200).json(userProfile);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  });
});

app.post('/story', (req, res) => {
  const { id, story_text } = req.body;
  console.log("User ID:", id);
  console.log("Story:", story_text); 
  const insertSql = "INSERT INTO story (id, story_text) VALUES (?, ?)";
  db.query(insertSql, [id, story_text], (err, result) => {
    if (err) {
      console.error("Error inserting story into database:", err);
      return res.status(500).json({ error: 'Error inserting story into database' });
    }
    return res.status(200).json({ message: 'Story added successfully' });
  });
});


app.listen(8081, () => {
    console.log("listening");
})