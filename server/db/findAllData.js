const MongoClient = require('mongodb').MongoClient
const express = require("express");
const router = express.Router();
require('dotenv').config();
const { connect ,close, getClient} =require('./ConnectToDb')

const dbName = process.env.dbName
const collectionName = process.env.collectionName

router.get('/', async (req, res) => {
    try {
        await connect();
        const database = getClient().db(dbName);
        const newData = database.collection(collectionName);
         const data = await newData.find({}).toArray()
         res.json(data);

    } catch (err) {
        res.status(500).send(err);
    }
    finally {
        close();

    }
});

module.exports = router;
