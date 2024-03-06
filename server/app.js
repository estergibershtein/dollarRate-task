const express = require("express");
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient
const dollarRoute = require('./services/api.js');

require('dotenv').config();

const URL = process.env.URL;
const PORT = process.env.PORT


app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


app.listen(PORT,
    console.log(`Server started on port ${PORT}`)
);
app.use('/api', dollarRoute);

MongoClient.connect(URL, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

MongoClient.connect(URL, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("AverageMonthlyDollar", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

const client = new MongoClient(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
async function insertOne() {
    try {
        await client.connect();
        const database = client.db("mydb");
        const newItem = database.collection("AverageMonthlyDollar");
        const document = { date: "01/02/24", avarege: 2.1 };
        const result = await newItem.insertOne(document);
        console.log(
            `documents were inserted with the _id: ${result.insertedId}`,
        );
    } finally {
        await client.close();
    }
}
insertOne().catch(console.dir);
