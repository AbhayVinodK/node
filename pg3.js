const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const storage = multer.diskStorage({
destination:'./uploads',
filename:(req,file,cb)=>cb(null, Date.now()+path.extname(file.originalname))
});
const upload = multer({storage});
app.get('/',(req,res)=>res.send(`<h2>Upload File</h2>
    <form method="POST" action="/upload" enctype="multipart/form-data">
    <input type="file" name="myfile"/>
    <button type="submit">Upload</button>
    </form>`));
app.post('/upload', upload.single('myfile'), 
(req,res)=>res.send(`File uploaded successfully as ${req.file.filename}`));
app.listen(3000, ()=>console.log('Server running at http://localhost:3000'));

