const MongoClient = require('mongodb').MongoClient
const express = require("express");
const router = express.Router();

const dbName = 'mydb'
const collectionName = 'AverageMonthlyDollar'

const client = new MongoClient('mongodb://172.17.0.5:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const monthNames = {
    January: "1",
    February: "2",
    March: "3",
    April: "4",
    May: "5",
    June: "6",
    July: "7",
    August: "8",
    September: "9",
    October: "10",
    November: "11",
    December: "12"
};

function getMonthNumber(monthName) {
    return monthNames[monthName];
}

router.get('/:month', async (req, res) => {
    const month = req.params.month;
    let numMonth = getMonthNumber(month)
    if (numMonth < 10) {
        numMonth = '0' + numMonth;
    }
    try {
        await client.connect();
        const database = client.db(dbName);
        const newItem = database.collection(collectionName);
        const dollarValue = await newItem.findOne({ month: month });
        res.json(dollarValue);
        client.close();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;