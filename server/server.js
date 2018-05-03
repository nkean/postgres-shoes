const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const shoes = [
    {
        name: 'Red Wing',
        cost: 250,
    },
    {
        name: 'Puma Soliel V2',
        cost: 40,
    },
    {
        name: 'Space Boots',
        cost: 10,
    },
    {
        name: 'Adidas Superstar',
        cost: 192,
    },
    {
        name: 'Jordan XII',
        cost: 178,
    },
    {
        name: 'Converse Chuck Taylor Low',
        cost: 32,
    },
    {
        name: 'Nike Roshe Run',
        cost: 127,
    },
    {
        name: 'Nike Huarache',
        cost: 148,
    },
];

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/shoes', (req, res) => {
    res.send(shoes);
});

app.post('/shoes', (req, res) => {
    shoes.push(req.body);
    console.log(shoes);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
});