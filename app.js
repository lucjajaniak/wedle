const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const PORT = 3000;
const url = "mongodb://localhost:27017/";
const dbName = "ryby_database";

let db;

app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(url)
    .then(client => {
        console.log("Połączono z MongoDB");
        db = client.db(dbName);

        app.listen(PORT, () => {
            console.log(`Serwer działa na http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Błąd połączenia z MongoDB", err);
    });

app.get('/api', async (req, res) => {
    if (!db) return res.status(500).send("Baza danych niegotowa");

    try {
        const fishList = await db.collection("ryby").find({}).toArray();
        res.json(fishList);
    } catch (err) {
        console.error(err);
        res.status(500).send("Błąd serwera");
    }
});
