const cors = require('cors');
const express = require("express");
const app = express();
const dollarRoute = require('./services/apiGetDollarRate.js');
const getData = require('./services/apiGetData')
const insertToDb = require('./services/apiInsertToDb.js')
const connectToDb = require('./services/apiConnectTDb.js')
require('dotenv').config();

const URL = process.env.URL;
const PORT = process.env.PORT


app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/data', getData);
app.use('/api', dollarRoute);
app.use('/insert', insertToDb);
app.use('/connect', connectToDb);

app.listen(PORT,
    console.log(`Server started on port ${PORT}`)
);

