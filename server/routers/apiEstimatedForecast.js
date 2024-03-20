const express = require("express");
const router = express.Router();
require('dotenv').config();
const { connect, close, getClient  } = require('../db/ConnectToDb')
const {  getArrayDates } = require('../services/dateOperation')

const dbName = process.env.dbName
const collectionName = process.env.collectionName

router.get('/', async (req, res) => {
    try {
        await connect();
        const database = getClient().db(dbName);
        const findMany = database.collection(collectionName);

        const currentDate = new Date()

        const results = await findMany.find({ date: { $in: getArrayDates(currentDate)} }, { average: 1, _id: 0 }).toArray()
        esimmatAvarege = ((results[0].average + results[1].average + results[2].average) / 3).toFixed(2)
        res.json(esimmatAvarege);
        close();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;
