const express = require("express");
const router = express.Router();
require('dotenv').config();

const API_KEY = "cur_live_L4xWROrxqd64HCLs4CPIrgx0gyfnpeBpV8TCuJKk";
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

const fetchDolarRate = async (date) => {
  const fetcUrl = `https://api.currencyapi.com/v3/historical?apikey=${API_KEY}&currencies=ILS&date=${date}`
  const response = await fetch(fetcUrl,requestOptions)
  return response.json()
}

router.get('/', async (req, res)=> {
    try {
      const date="01/01/2023"
      const dolarRate = await fetchDolarRate(date);
      const dollarValue=  dolarRate.data.ILS.value

    res.json(dollarValue)
    return dolarRate
  } catch (err) {
    res.json({message: err})
  }
})

module.exports = router;