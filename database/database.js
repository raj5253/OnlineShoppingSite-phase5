//  same file as done in all my projects
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  let client;
  if (process.env.MONGODB_URL != "") {
    client = await MongoClient.connect(
      "mongodb+srv://rajsatyam8532:raghav@cluster0.lf8oxew.mongodb.net/?retryWrites=true&w=majority"
    );
  } else {
    client = await MongoClient.connect("mongodb://localhost:27017");
  }

  database = client.db("online-shop");
}

function getDb() {
  if (!database) {
    throw new Error("Database not connected");
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
