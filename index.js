const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri =
  "mongodb://localhost:27017/ryby_database";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db('ryby_database');
    const ryby = database.collection('ryby');

    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const ryba = await ryby.find(query).toArray();

    console.log(ryba[3]);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);