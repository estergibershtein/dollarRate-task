const { subMonths, format } = require('date-fns');
const express = require("express");
const router = express.Router();
require('dotenv').config();
const { connect, close, getClient } = require('../db/ConnectToDb')
const { getPredictedAverage  } = require('../services/dateOperation')

const dbName = process.env.dbName
const collectionName = process.env.collectionName

router.get('/', async (req, res) => {
       try {
        await connect();
        const database = getClient().db(dbName);
        const newData = database.collection(collectionName);
        let data = await newData.find({}).toArray()
        data = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
        let PredictedAverage = getPredictedAverage(data)
        res.json(PredictedAverage)
    } catch (err) {
        res.status(500).send(err);
    }
    finally {
        await close();
    }
})

module.exports = router;
