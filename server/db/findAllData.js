const MongoClient = require('mongodb').MongoClient
const express = require("express");
const router = express.Router();
const client = new MongoClient('mongodb://172.17.0.5:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

router.get('/', async (req, res) => {
    try {

        await client.connect();
        const database = client.db("mydb");
        const newData = database.collection("AverageMonthlyDollar");
        const data = await newData.find({}).toArray()
        console.log(data);
        res.json(data);

    } catch (err) {
        res.status(500).send(err);
    }
    finally {
        client.close();

    }
});

module.exports = router;