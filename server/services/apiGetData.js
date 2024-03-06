
const express = require("express");
const router = express.Router();
const Data = [
  {
    id: 1,
    year: "01/2023",
    avarege : 0.33,
   },
  {
    id: 2,
    year: "02/23",
    avarege : 0.31,
   },
  {
    id: 3,
    year:"02/23",
    avarege : 0.89,
  },
  {
    id: 4,
    year: "02/23",
    avarege : 0.12,
        },
  {
    id: 5,
    year:"02/23",
    avarege : 0.85,
    },
  {
    id: 5,
    year: "02/23",
    avarege : 0.99,
    }
  ,
  {
    id: 6,
    year: "02/24",
    avarege : 0.77,
   }
];
router.get('/', async function (req, res) {
  res.json(Data);
})

module.exports = router;
