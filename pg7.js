const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send(`
<form method="POST" action="/data">
<input name="name" placeholder="Name">
<input name="age" placeholder="Age">
<button>Send</button>
</form>
`));

app.post('/data', (req, res) => {
    console.log(req.body);
    res.send('Received');
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));