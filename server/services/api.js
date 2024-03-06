const express = require("express");
const router = express.Router();
const { exchangeRates } = require('exchange-rates-api');

router.get('/', async function (req, res) {
  res.json({ message: "Hello from node!" });
  res = await exchangeRates().at('2018-03-26').symbols('USD').fetch();
  await exchangeRates().at('2018-03-26').symbols('USD').fetch()
})

module.exports = router;
