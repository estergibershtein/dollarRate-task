const MongoClient = require('mongodb').MongoClient;
const URL = process.env.URL ;
const dbName = 'myDatabase';
require('dotenv').config();

MongoClient.connect(URL, function(err, client) {
  if (err) throw err;
  const db = client.db(mydb);
  
  const currentDate = new Date();
  const collection = db.collection(AverageMonthlyDollar
    );

  const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  
  const data = {
    date: previousMonth,
    average: 0.3  
};
collection.insertOne(data, function(err, result) {
    if (err) throw err;
    console.log('Monthly average data inserted successfully');
    client.close();
});
  
  client.close();
});


