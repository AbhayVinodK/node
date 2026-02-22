const express = require("express");
const app = express();
app.use(express.json());

let articles = [];

// CREATE article
app.post("/article", (req, res) => {
  const a = { id: Date.now(), ...req.body };
  articles.push(a);
  res.json(a);
});

// GET all articles
app.get("/articles", (req, res) => res.json(articles));

// DELETE single article
app.delete("/article/:id", (req, res) => {
  const i = articles.findIndex(a => a.id == req.params.id);
  if (i === -1) return res.send("Not found");
  articles.splice(i, 1);
  res.send("Deleted");
});

// DELETE all articles
app.delete("/articles", (req, res) => {
  articles = [];
  res.send("All deleted");
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));