const express = require("express");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const URL = process.env.URL;

// const dollarRoute = require('./../services/ApiGetDollarRate');

// const dolarRate = router.use('/getRate', dollarRoute);

const client = new MongoClient('mongodb://172.17.0.5:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const insertOne = async function insertOne() {

    try {
        await client.connect();
        const database = client.db("mydb");
        const newItem = database.collection("AverageMonthlyDollar");
        const currentDate = new Date()
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const data = {
            date: previousMonth,
            average: dolarRate
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
router.get('/', async (req, res) => {
    try {
        const result = await insertOne();
        res.json(result)
    } catch (err) {
        console.log(err);
        res.json({ message: err })
    }
})


module.exports = router;
