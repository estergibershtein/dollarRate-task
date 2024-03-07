const express = require("express");
const router = express.Router();

const API_KEY = process.env.API_KEY;
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

const fetchDolarRate = async () => {
  const fetcUrl = "https://api.currencyapi.com/v3/historical?apikey=cur_live_L4xWROrxqd64HCLs4CPIrgx0gyfnpeBpV8TCuJKk&currencies=ILS&date=2024-03-06"
  const response = await fetch(fetcUrl,requestOptions)
  return response.json()
}

router.get('/', async (req, res)=> {
  try {
    const dolarRate = await fetchDolarRate();
    res.json(dolarRate.data.ILS.value)
    return dolarRate
  } catch (err) {
    res.json({message: err})
  }
})

module.exports = router;
