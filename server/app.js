const express = require("express");
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient
const dollarRoute = require('./services/apiGetDollarRate.js');
const getData = require('./services/apiGetData')
const { exchangeRates } = require('exchange-rates-api');

require('dotenv').config();

const URL = process.env.URL;
const PORT = process.env.PORT

const dbName = 'mydb'
const collectionName = 'AverageMonthlyDollar'
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/data', getData);

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
        const currentDate = new Date()
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const data = {
            date: previousMonth,
            average: await exchangeRates().latest().symbols('USD').fetch()
        };
        const document = data
        const result = await newItem.insertOne(document);
        console.log(
            `documents were inserted with the _id: ${result.insertedId}`,
        );
    } finally {
        await client.close();
    }
}
insertOne().catch(console.error);

const collection = client.db(dbName).collection(collectionName);
async function find() {
    try {
        await client.connect();
        const database = client.db("mydb");
        const findAll = database.collection("AverageMonthlyDollar");
        const result = await findAll.findOne(({}, { _id: 0 }))
    } finally {
        await client.close();
    }
}
const data = find().catch(console.error);
