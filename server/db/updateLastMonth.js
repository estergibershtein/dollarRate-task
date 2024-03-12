const router = require('./findAllData');

const CronJob = require('cron').CronJob;
const MongoClient = require('mongodb').MongoClient
const fetchDolarRate = require('../services/ApiGgetDollarRate')


const dbName = 'mydb'
const collectionName = 'AverageMonthlyDollar'


const client = new MongoClient('mongodb://172.17.0.5:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect((err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    const tryfetchDolarRate = async () => {
        try {
            const dolarRate = await fetchDolarRate();
            res.json(dolarRate.data.ILS.value)
            return dolarRate
        } catch (err) {
            res.json({ message: err })
        }
    }
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    router.post('/', (req, res) => {
        new CronJob('0 0 1 1 *', async () => {
            try {
                 const newDocument = { data : data , average :average  }
                await collection.insertOne(newDocument);
                res.send("success insetation")
            } catch (error) {
                console.error(error);
                process.exit(1);
            }
        }, null, true, 'Israel');
    });
})
module.exports = router
