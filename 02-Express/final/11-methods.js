const express = require('express');
const app = express();
let { people } = require('../data');

// static assets
app.use(express.static('../methods-public'));

// parse form data
app.use(express.urlencoded({ extended: false }));

// Method: GET
app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people });
});

// Methods - POST (Form Example)
app.post('/login', (req, res) => {
    // console.log(req.body);
    const { name } = req.body;
    if (name) {
        return res.status(200).send(`Welcome ${name}`);
    }
    // res.send('POST');
    res.status(401).send('Please Provide Credentials');
});

// parse json
app.use(express.json());

// Methods - POST (Javascript Example)
app.post('/api/people', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please Provide Name Value' });
    }
    res.status(201).json({ success: true, person: name });
});

// POSTMAN - POST (JSON Example)
app.post('/api/postman/people', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please Provide Name Value' });
    }
    res.status(201).json({ success: true, data: [...people, name] });
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});