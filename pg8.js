const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "article",
  password: "root",
  port: 5432,
});

// Insert article
app.post("/article", async (req, res) => {
  const { title, content } = req.body;
  await pool.query(
    "INSERT INTO articles(title,content) VALUES($1,$2)",
    [title, content]
  );
  res.send("Article added");
});

// Get all articles
app.get("/articles", async (req, res) => {
  const result = await pool.query("SELECT * FROM articles");
  res.json(result.rows);
});


app.listen(3000, () => console.log("Server running"));

/* db
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

