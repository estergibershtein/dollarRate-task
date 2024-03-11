
const express = require("express");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const URL = process.env.URL;

const dbName = 'mydb'
const collectionName = 'AverageMonthlyDollar'

MongoClient.connect('mongodb://172.17.0.5:27017/', function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.createCollection(collectionName, function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

const client = new MongoClient('mongodb://172.17.0.5:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
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
router.get('/', async (req, res) => {
    try {
        const result = await find();
        res.json(result)
    } catch (err) {
        console.log(err);
        res.json({ message: err })
    }
})
module.exports = router;
