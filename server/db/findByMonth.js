const express = require("express");
const router = express.Router();
require('dotenv').config();

const { connect, close, getClient } = require('./ConnectToDb')

const dbName = process.env.dbName
const collectionName = process.env.collectionName

router.get('/:month', async (req, res) => {
    let numMonth = req.params.month;
    numMonth = numMonth.replace('-', '/');
    try {
        await connect();
        const database = getClient().db(dbName);
        const newItem = database.collection(collectionName);
        const newNumMonth = `01/${numMonth}`
        const dollarValue = await newItem.findOne({ date: newNumMonth });
        res.json(dollarValue);

    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally { close() }
});

module.exports = router;
