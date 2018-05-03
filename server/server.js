const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
    database: 'shoe_store',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log(`Postgresql connected`);
});

pool.on('error', (error) => {
    console.log(`Error with postgres pool: ${error}`);
});

const app = express();

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

app.use(bodyParser.json());

app.get('/shoe', (req, res) => {
    res.send(shoes);
});

app.post('/shoe', (req, res) => {
    const shoe = req.body;
    pool.query(`INSERT INTO "shoes" ("name", "cost")
                VALUES ($1, $2);`, [shoe.name, shoe.cost]) // data sanitization!
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`error with SQL INSERT on POST to /shoe: ${error}`);
            res.sendStatus(500);
        });
});

app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
});