const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "art",
  password: "root",
  port: 5432,
});

// GET article by ID
app.get("/articles/:id", async (req, res) => {
  const r = await db.query("SELECT * FROM articles WHERE id=$1", [req.params.id]);
  if (!r.rowCount) return res.status(404).send("Article not found");
  res.json(r.rows[0]);
});

// PUT update entire article
app.put("/article/:id", async (req, res) => {
  const { title, content } = req.body;
  const r = await db.query(
    "UPDATE articles SET title=$1, content=$2 WHERE id=$3 RETURNING *",
    [title, content, req.params.id]
  );
  if (!r.rowCount) return res.status(404).send("Article not found");
  res.json(r.rows[0]);
});

// PATCH update partial fields
app.patch("/article/:id", async (req, res) => {
  const { title, content } = req.body;
  const r = await db.query(
    "UPDATE articles SET title=COALESCE($1,title), content=COALESCE($2,content) WHERE id=$3 RETURNING *",
    [title, content, req.params.id]
  );
  if (!r.rowCount) return res.status(404).send("Article not found");
  res.json(r.rows[0]);
});

app.listen(3000, () => console.log("Server running"));
/* CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);*/


app.listen(3000, () => console.log("Server running"));
