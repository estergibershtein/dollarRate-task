require('dotenv').config();

const MongoClient = require('mongodb').MongoClient
const IpAdress = process.env.IpAdress

const dbName = process.env.dbName
const collectionName = process.env.collectionName

let client = new MongoClient(IpAdress, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const connect = async () => {
  if (!IpAdress) throw new Error('URL is required');
  client = new MongoClient(IpAdress);
  await client.connect();
} 

const close = async () => {
  if (!client) throw new Error('Client is never connected');
  await client.close();
} 

const getClient = () => client;

async function creatCollection() {

  MongoClient.connect(IpAdress, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.createCollection(collectionName, function (err, res) {
      if (err) throw new Error( `Error creating collection`);
      db.close();
    });
  });
}
module.exports = {
  connect,
  close,
  getClient
  
};
