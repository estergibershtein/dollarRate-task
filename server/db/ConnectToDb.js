require('dotenv').config();

const express = require("express");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const IpAdress = process.env.IpAdress

const dbName = 'mydb'
const collectionName = 'AverageMonthlyDollar'


let client = new MongoClient(IpAdress, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connect = async () => {
  if (!IpAdress) throw new Error('URL is required');
  client = new MongoClient(IpAdress);
  await client.connect();
};

const close = async () => {
  if (!client) throw new Error('Client is never connected');
  await client.close();
};

const getClient = () => client;

async function creatCollection() {

  MongoClient.connect(IpAdress, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.createCollection(collectionName, function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
}
module.exports = {
  connect,
  close,
  getClient,
  creatCollection
};
