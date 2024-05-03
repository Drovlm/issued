const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const session = require("express-session");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "register",
});

const fs = require("fs");
// const bodyParser = require('body-parser');

app.post("/register", upload.single("img"), async (req, res) => {
  let img = "";

  if (req.file !== undefined) {
    const file_buffer = fs.readFileSync(req.file.path);
    const buf = new Buffer.from(file_buffer);
    img = buf;
  }

  const insertSql =
    "INSERT INTO login (name, last, father, `date`, email, password, institute, specialist, issuey, img, vkLink, telegramLink, instagramLink, facebookLink) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const selectSql = "SELECT * FROM login WHERE email = ? AND password = ?";

  db.query(
    insertSql,
    [
      req.body.name,
      req.body.last,
      req.body.father,
      req.body.date,
      req.body.email,
      req.body.password,
      req.body.institute,
      req.body.specialist,
      req.body.issuey,
      img,
      req.body.vkLink,
      req.body.telegramLink,
      req.body.instagramLink,
      req.body.facebookLink,
    ],
    (err, insertResult) => {
      if (err) {
        console.error("Error inserting data into database:", err);
        return res
          .status(500)
          .json({ error: "Error inserting data into database" });
      }

      db.query(
        selectSql,
        [req.body.email, req.body.password],
        (err, selectResult) => {
          if (err) {
            console.error("Error selecting data from database:", err);
            return res
              .status(500)
              .json({ error: "Error selecting data from database" });
          }

          if (selectResult.length > 0) {
            return res.status(200).json({ message: "Registration Successful" });
          } else {
            return res.status(200).json({ message: "Failed" });
          }
        }
      );
    }
  );
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const selectSql =
    "SELECT name, img, id FROM login WHERE email = ? AND password = ?";
  db.query(
    selectSql,
    [req.body.email, req.body.password],
    (err, selectResult) => {
      if (err) {
        console.error("Error in login query:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (selectResult.length > 0) {
        const { name, img, id } = selectResult[0];
        console.log("User ID:", id);
        const sessionToken = generateSessionToken(id);
        return res
          .status(200)
          .json({ message: "Login Successfully", name, img, id, sessionToken });
      } else {
        return res.status(200).json({ message: "Failed" });
      }
    }
  );
});

function generateSessionToken(id) {
  console.log("ID:", id);
  return id;
}

app.post('/addStory/', upload.single("story_image"), async (req, res) => {
  let { story_image, story_text, id } = req.body;

  if (req.file !== undefined) {
    const file_buffer = fs.readFileSync(req.file.path);
    const buf = new Buffer.from(file_buffer);
    story_image = buf;
  }
  
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
