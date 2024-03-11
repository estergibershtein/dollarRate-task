const cors = require('cors');
require('dotenv').config();
const express = require("express");
const app = express();

const dollarRoute = require('./services/apiSetDollarRate.js');
const getData = require('./db/findAllData.js')
const insertToDb = require('./db/iInsertToDb.js')
const geavaregeBymonth = require('./db/findByMonth')
const update = require('./db/updateLastMonth')
const ApiGetDollarRate = require('./services/ApiGetDollarRate')

const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/data', getData);
app.use('/dollarValue', geavaregeBymonth);

app.use('/api', dollarRoute);
app.use('/insert', insertToDb);
app.use('/data', update);
app.use('/getRate', ApiGetDollarRate);

app.listen(PORT,
    console.log(`Server started on port ${PORT}`)
);
