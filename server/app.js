const cors = require('cors');
require('dotenv').config();
const express = require("express");
const app = express();

const getData = require('./routers/findAllData.js')
const insertToDb = require('./db/iInsertToDb.js')
const getAvaregeBymonth = require('./routers/findByMonth')
const apiedForecast = require('./routers/apiEstimatedForecast')
const apiEstimatAllData  = require('./routers/allForecast')
const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/data', getData);
app.use('/dollarValue', getAvaregeBymonth);
// app.use('/Estimat', apiedForecast );
app.use('/EstimatAllData', apiEstimatAllData );


app.get('/', (res, req)=> {
   insertToDb.insertOne();
   })
app.listen(PORT,
    console.log(`Server started on port ${PORT}`)
);
