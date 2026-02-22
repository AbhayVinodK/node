const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const db = new Pool({ user:"postgres", host:"localhost", database:"art", password:"root", port:5432 });

app.post("/article", async (req, res) => {
  const r = await db.query("INSERT INTO articles(title,content) VALUES($1,$2) RETURNING *",
    [req.body.title, req.body.content]);
  res.json(r.rows[0]);
});

app.get("/articles", async (req, res) => {
  const r = await db.query("SELECT * FROM articles ORDER BY id");
  res.json(r.rows);
});

app.delete("/article/:id", async (req, res) => {
  const r = await db.query("DELETE FROM articles WHERE id=$1 RETURNING *", [req.params.id]);
  if (!r.rowCount) return res.status(404).send("Not found");
  res.json(r.rows[0]);
});

app.delete("/articles", async (req, res) => {
  await db.query("DELETE FROM articles");
  res.send("All deleted");
});

app.listen(3000, () => console.log("Server running"));