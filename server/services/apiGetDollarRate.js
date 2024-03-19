const express = require("express");
const router = express.Router();
require('dotenv').config();

const API_KEY =  process.env.CUR_LIVE
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const fetchDolarRate = async (date) => {
  const fetcUrl = `https://api.currencyapi.com/v3/historical?apikey=${API_KEY}&currencies=ILS&date=${date}`
  const response = await fetch(fetcUrl, requestOptions)
  return response.json()
}
const getDolarRate = async (date) => {
  try {
    const dolarRate = await fetchDolarRate(date);
    return ({ date: date, dollarValue: dolarRate.data.ILS.value })
  } catch (err) {
    console.log(err);
  }
}
module.exports = { getDolarRate };
