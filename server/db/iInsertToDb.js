const express = require("express");
const CronJob = require('cron').CronJob;

const getDolar = require('../api/apiGetDollarRate');
const { connect ,close, getClient} =require('./ConnectToDb')


require('dotenv').config();


const dbName = process.env.dbName
const collectionName = process.env.collectionName

 async function insertOne() {
    new CronJob('0 0 1 * *', async () => {

    try {
        await connect();
        const database = getClient().db(dbName);
        const newItem = database.collection(collectionName);
        const currentDate = new Date()
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const getRate = await getDolar.getDolarRate(previousMonth.toISOString())

        previousMonth = `01/${previousMonth.getFullYear()}/${previousMonth.getMonth()}`

        const data = {
            date: previousMonth,
            average: getRate.dollarValue
        };
        const document = data
        const result = await newItem.insertOne(document);
        console.log(
            `documents were inserted with the _id: ${result.insertedId}`,
        );
    } finally {
        await close();
    }
}, null, true, 'Israel');
} 
 
module.exports = {insertOne};
