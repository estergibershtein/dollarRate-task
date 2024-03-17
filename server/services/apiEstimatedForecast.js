const { subMonths, format } = require('date-fns');
const express = require("express");
const router = express.Router();
require('dotenv').config();
const { connect, close, getClient } = require('../db/ConnectToDb')

const dbName = 'mydb'
const collectionName = 'AverageMonthlyDollar'

let arrayDate = []

function getDates(currentDate) {
    Array.from({ length: 3 }, (_, index) => {
        let date = subMonths(currentDate, index + 1);
        arrayDate[index] = date.getMonth() < 10 ? arrayDate[index] = `01/0${date.getMonth() + 1}/${date.getFullYear()}` :
            `01/${date.getMonth() + 1}/${date.getFullYear()}`
    });
    return arrayDate
}

router.get('/', async (req, res) => {
    try {
        await connect();
        const database = getClient().db(dbName);
        const findMany = database.collection(collectionName);

        const currentDate = new Date()

        const results = await findMany.find({ date: { $in: getDates(currentDate)} }, { average: 1, _id: 0 }).toArray()
        esimmatAvarege = ((results[0].average + results[1].average + results[2].average) / 3).toFixed(2)
        res.json(esimmatAvarege);
        close();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;





// const { subMonths, format } = require('date-fns');
// const express = require("express");
// const router = express.Router();
// require('dotenv').config();
// const { connect, close, getClient } = require('../db/ConnectToDb')

// const dbName = 'mydb'
// const collectionName = 'AverageMonthlyDollar'

// let arrayDate = []

// findLastDate = async(currentDate) => {

//     const previousMonths = Array.from({ length: 3 }, (_, index) => {
//         let date = subMonths(currentDate, index + 1);

//         arrayDate[index] = date.getMonth() < 10 ? arrayDate[index] = `01/0${date.getMonth() + 1}/${date.getFullYear()}` :
//             `01/${date.getMonth() + 1}/${date.getFullYear()}`
//     });
//  return
// }

// router.get('/', async (req, res) => {
//     try {
//         await connect();
//         const database = getClient().db(dbName);
//         const findMany = database.collection(collectionName);
//         const arrayDate =await findLastDate(new Date())
//         console.log(arrayDate);

//         const results = await findMany.find({ date: { $in: arrayDate } }, { average: 1, _id: 0 }).toArray()
//         esimmatAvarege = ((results[0].average + results[1].average + results[2].average) / 3).toFixed(2)
//         res.json(esimmatAvarege);
//         close();
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })

// module.exports = router;
