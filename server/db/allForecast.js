const { subMonths, format } = require('date-fns');
const express = require("express");
const router = express.Router();
require('dotenv').config();
const { connect, close, getClient } = require('../db/ConnectToDb')
const dbName = process.env.dbName
const collectionName = process.env.collectionName

function getDates(currentDate) {
    let arrayDate = []
    let date = ""
    Array.from({ length: 3 }, (_, index) => {
        date = subMonths(currentDate, index + 1);
        arrayDate[index] = date.getMonth() < 9 ? arrayDate[index] = `01/0${date.getMonth() + 1}/${date.getFullYear()}` :
            `01/${date.getMonth() + 1}/${date.getFullYear()}`
    });
    return arrayDate
}

async function getPredictedAverage(allData) {
    let arrayDate = []
    let PredictedAverage = []
    for (let i = 3; i < allData.length - 1; i++) {
        let convertedDate = convertDateFormat(allData[i].date);
        arrayDate = getDates(convertedDate)
        if (arrayDate.length == 3) {
            let items = await findAvgByDates(arrayDate)
            PredictedAverage.push({ "date": allData[i].date, "PredictedAverage": items })
        }
    }
    return PredictedAverage
}

async function findAvgByDates(dates) {
    try {
        await connect();
        const database = getClient().db(dbName);
        const finbyDates = database.collection(collectionName);
        const results = await finbyDates.find({ date: { $in: dates } }, { average: 1, _id: 0 }).toArray()
        esimmatAvarege = ((results[0].average + results[1].average + results[2].average) / 3).toFixed(2)
        return esimmatAvarege
    } catch (error) { throw new Error("invalid data") }
    finally {
        close()
    }

}

router.get('/', async (req, res) => {
    try {
        await connect();
        const database = getClient().db(dbName);
        const newData = database.collection(collectionName);
        let data = await newData.find({}).toArray()
        data = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
        let PredictedAverage = await getPredictedAverage(data)
        res.json(PredictedAverage)
    } catch (err) {
        res.status(500).send(err);
    }
    finally {
        close();
    }
})

function convertDateFormat(inputDate) {
    const parts = inputDate.split('/');
    const [day, month, year] = parts;
    return `${month}/${day}/${year}`;
}

module.exports = router;
