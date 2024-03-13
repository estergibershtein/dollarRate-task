const { subMonths, format } = require('date-fns');
const express = require("express");
const router = express.Router();
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient


const dbName = 'mydb'
const collectionName = 'AverageMonthlyDollar'
const IpAdress = process.env.IpAdress


const client = new MongoClient(IpAdress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dollarValue = []
let month

router.get('/', async (req, res) => {
    try {
        await client.connect();
        const database = client.db(dbName);
        const findMany = database.collection(collectionName);

        const currentDate = new Date()
        const previousMonths = Array.from({ length: 3 }, (_, index) => {
            let date = subMonths(currentDate, index + 1);

            dollarValue[index] = date.getMonth() < 10 ? dollarValue[index] = `01/0${date.getMonth() + 1}/${date.getFullYear()}` :
                `01/${date.getMonth() + 1}/${date.getFullYear()}`
        });
        const results = await findMany.find({ date: { $in: dollarValue } }, { average: 1, _id: 0 }).toArray()
        esimmatAvarege = ((results[0].average + results[1].average + results[2].average) / 3).toFixed(2)
        res.json(esimmatAvarege);
        client.close();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;