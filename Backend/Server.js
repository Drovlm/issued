const express = require('express');
const mysql = require('mysql');
const session = require('express-session'); 
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001',
}));

app.use(session({
  secret: '142753869',
  resave: false,
  saveUninitialized: true
}));
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "register"  
});

const fs = require('fs');

app.post('/register', (req, res) => {
  console.log(req.body);
  console.log(req.body.img);
  const { img } = req.body;
  const insertSql = "INSERT INTO login (name, last, father, `date`, email, password, institute, specialist, issuey, img, vkLink, telegramLink, instagramLink, facebookLink) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const selectSql = "SELECT * FROM login WHERE email = ? AND password = ?";

  db.query(insertSql, [req.body.name, req.body.last, req.body.father, req.body.date, req.body.email, req.body.password, 
    req.body.institute, req.body.specialist, req.body.issuey, req.body.img, req.body.vkLink, req.body.telegramLink,
    req.body.instagramLink, req.body.facebookLink], (err, insertResult) => {
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
  const selectSql = "SELECT name, img, id FROM login WHERE email = ? AND password = ?";
  db.query(selectSql, [req.body.email, req.body.password], (err, selectResult) => {
    if (err) {
      console.error("Error in login query:", err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (selectResult.length > 0) {
      const { name, img, id } = selectResult[0];
      console.log("User ID:", id);
      const sessionToken = generateSessionToken(id);
      return res.status(200).json({ message: 'Login Successfully', name, img, id, sessionToken });
    } else {
      return res.status(200).json({ message: 'Failed' });
    }
  });
});

function generateSessionToken(id) {
  console.log("ID:", id);
  return id; 
}

app.post('/addStory/', (req, res) => {
  const { story_image, story_text, id } = req.body;
  const updateSql = `UPDATE login SET story_image = ?, story_text = ? WHERE id = ?`;
  db.query(updateSql, [story_image, story_text, id], (err, result) => {
    if (err) {
      console.error("Error inserting data into database:", err);
      return res.status(500).json({ error: 'Error inserting data into database' });
    }
    console.log("ID Token:", id);
    return res.status(200).json({ message: 'Story added successfully' });
  });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

  



{/*  app.post('/addStory', (req, res) => {
    console.log(req.body);
  
    const selectSql = "SELECT id FROM login WHERE email = ? AND password = ?";
    console.log("Email:", req.body.email);
    console.log("Password:", req.body.password);
    db.query(selectSql, [req.body.email, req.body.password], (err, selectResult) => {
        if (err) {
            console.error("Error selecting user:", err);
            return res.status(500).json({ error: 'Error selecting user' });
        }
       
        if (selectResult.length > 0) {
            const id = selectResult[0].id;
            const updateSql = "UPDATE login SET story_image = ?, story_text = ? WHERE id = ?";
            const { story_text } = req.body;
            db.query(updateSql, [ story_text, id], (err, result) => {
                if (err) {
                    console.error("Error updating story:", err);
                    return res.status(500).json({ error: 'Error updating story' });
                }
                console.log("Story updated successfully");
                return res.status(200).json({ message: 'Story added successfully' });
            });
        } else {
            console.log("User not found");
            return res.status(200).json({ message: 'User not found' });
        }
    });
}); */}




{/*  app.post('/addStory', (req, res) => {
    console.log(req.body);
    const updateSql = "UPDATE login SET story_image = ?, story_text = ? WHERE email = ?";const { story_image, story_text } = req.body;
    db.query(updateSql, [story_image, story_text], (err, result) => {
        if (err) {
            console.error("Error inserting data into database:", err);
            return res.status(500).json({ error: 'Error inserting data into database' });
        }
        return res.status(200).json({ message: 'Story added successfully' });
    });
}); */}



{/*app.post('/addStory', (req, res) => {
    console.log(req.body);
    
    const selectSql = "SELECT id FROM login WHERE email = ? AND password = ?";
    console.log("Email:", req.body.email);
    console.log("Password:", req.body.password);
    db.query(selectSql, [req.body.email, req.body.password], (err, selectResult) => {
        if (err) {
            console.error("Error selecting user:", err);
            return res.status(500).json({ error: 'Error selecting user' });
        }

        console.log("Select Result:", selectResult);

        if (selectResult.length > 0) {
            const userId = selectResult[0].id;
            const updateSql = "UPDATE login SET story_image = ?, story_text = ? WHERE id = ?";
            const { story_image, story_text } = req.body;
            db.query(updateSql, [story_image, story_text, userId], (err, result) => {
                if (err) {
                    console.error("Error updating story:", err);
                    return res.status(500).json({ error: 'Error updating story' });
                }
                console.log("Story updated successfully");
                return res.status(200).json({ message: 'Story added successfully' });
            });
        } else {
            console.log("User not found");
            return res.status(200).json({ message: 'User not found' });
        }
    });
}); */}






{/*app.post('/story', (req, res) => {
  console.log(req.body);
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

app.get('/story/:userId', (req, res) => {
  const userId = req.params.userId;
  const selectSql = "SELECT story_image, story_text FROM story WHERE id = ?";
  
  db.query(selectSql, [userId], (err, stories) => {
      if (err) {
          console.error("Error fetching stories from database:", err);
          return res.status(500).json({ error: 'Error fetching stories from database' });
      }
      return res.status(200).json({ stories });
  });
});*/}


{/*
app.post('/story', (req, res) => {
  console.log(req.body);
  const { id, story_text } = req.body;

  // Assuming you have a mechanism to store the user ID in the session or database after a successful login
  const userID = req.session.userID || req.db.userID;

  console.log("User ID:", userID);
  console.log("Story:", story_text);

  const insertSql = "INSERT INTO story (id, story_text, user_id) VALUES (?, ?, ?)";
  db.query(insertSql, [id, story_text, userID], (err, result) => {
    if (err) {
      console.error("Error inserting story into database:", err);
      return res.status(500).json({ error: 'Error inserting story into database' });
    }
    return res.status(200).json({ message: 'Story added successfully' });
  });
}); */}




{/*const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const jwt = require('jsonwebtoken');

function generateToken(id) {
  return jwt.sign({ id }, 'jsonwebtoken', { expiresIn: '5h' });
}

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'Token is missing' });
  }

  jwt.verify(token, 'jsonwebtoken', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.userId = decoded.id;
    next();
  });
}

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
        const token = generateToken(id);
        return res.status(200).json({ message: 'Login Successfully', name, img, token });
      } else {
        return res.status(200).json({ message: 'Failed' });
      }
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

// Story endpoint
app.post('/story', verifyToken, (req, res) => {
  const { story_text, story_image } = req.body;
  const id = req.userId; // Extracted from JWT
  console.log("User ID:", id);
  console.log("Story image:", story_image);
  console.log("Story text:", story_text);
  
  const insertSql = "INSERT INTO story (id, story_image, story_text) VALUES (?, ?, ?)";
  db.query(insertSql, [id, story_image, story_text], (err, result) => {
    if (err) {
      console.error("Error inserting story into database:", err);
      return res.status(500).json({ error: 'Error inserting story into database' });
    }
    return res.status(200).json({ message: 'Story added successfully' });
  });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/}