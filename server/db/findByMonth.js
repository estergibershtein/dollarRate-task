const MongoClient = require('mongodb').MongoClient
const express = require("express");
const router = express.Router();
require('dotenv').config();
const dbName = 'mydb'
const collectionName = 'AverageMonthlyDollar'
const IpAdress = process.env.IpAdress
const client = new MongoClient(IpAdress, {
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
    console.log("in getMonth");
    const month = req.params.month;
    let numMonth = getMonthNumber(month)
    if (numMonth < 10) {
        numMonth = '0' + numMonth;
    }
    console.log(numMonth, "num");
    try {
        await client.connect();
        const database = client.db(dbName);
        const newItem = database.collection(collectionName);
        const newNumMonth  = `01/${numMonth}/24`
        const dollarValue = await newItem.findOne({ date: newNumMonth });
        console.log(dollarValue,"dollar");
        res.json(dollarValue);
        client.close();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;