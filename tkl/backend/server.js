const express = require("express");
const cors = require('cors');
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;
const db = new sqlite3.Database("users.db");
const SECRET_KEY = "your_jwt_secret_key"; // Change this to a secure key

app.use(cors());
app.use(bodyParser.json());

// Initialize the database schema and create default admin
const initDatabase = () => {
  db.serialize(() => {
    // Create the users table if it doesn't exist
    db.run(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)",
      (err) => {
        if (err) {
          console.error("Error creating users table:", err.message);
          return;
        }
        console.log("Database initialized");

        // Check if the admin user already exists
        db.get(
          "SELECT * FROM users WHERE username = ?",
          ["admin"],
          (err, row) => {
            if (err) {
              console.error("Error checking for admin user:", err.message);
              return;
            }

            if (!row) {
              // Admin user doesn't exist, create it
              bcrypt.hash("admin", 10, (err, hashedPassword) => {
                if (err) {
                  console.error("Error hashing admin password:", err.message);
                  return;
                }

                db.run(
                  "INSERT INTO users (username, password) VALUES (?, ?)",
                  ["admin", hashedPassword],
                  function (err) {
                    if (err) {
                      console.error("Error inserting admin user:", err.message);
                    } else {
                      console.log("Default admin user created");
                    }
                  },
                );
              });
            }
          },
        );
      },
    );
  });
};

// Call the function to initialize the database
initDatabase();

// Registration endpoint
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  try {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: "Error hashing password" });
      }
  
      db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        function (err) {
          
          if (err) {
            return res.status(500).json({ message: "User registered already!" });
          }
          res.status(201).json({ message: "User registered successfully" });
        },
      );
    });
  } catch(err) {
    console.error(err)
  }
  
});

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (err) return res.status(500).json({ message: "Error fetching user" });
    if (!row) return res.status(401).json({ message: "User not found" });

    bcrypt.compare(password, row.password, (err, result) => {
      if (err)
        return res.status(500).json({ message: "Error comparing passwords" });
      if (!result)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: row.id, username: row.username },
        SECRET_KEY,
        { expiresIn: "1h" },
      );
      res.json({ message: "Login SUCESS!", user: {name: username, token: token} });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
