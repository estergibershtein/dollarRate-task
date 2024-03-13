const MongoClient = require('mongodb').MongoClient
const express = require("express");
const router = express.Router();
require('dotenv').config();

const IpAdress = process.env.IpAdress

const client = new MongoClient(IpAdress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

router.get('/', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("mydb");
        const newData = database.collection("AverageMonthlyDollar");
         const data = await newData.find({}).toArray()
        res.json(data);

    } catch (err) {
        res.status(500).send(err);
    }
    finally {
        client.close();

    }
});

module.exports = router;