const express = require("express");
const path = require("path");

const app = express();

app.get("/download/:filename", (req, res) => {
    const filePath = path.join(__dirname, "files", req.params.filename);
    res.download(filePath, err => {
        if (err) res.status(404).send("File not found");
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});