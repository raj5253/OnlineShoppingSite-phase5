const mongoDbStore = require("connect-mongodb-session");
const expressSession = require("express-session");

function createSessionStore() {
  const MongoDbStore = mongoDbStore(expressSession); //1 defining  MongodbStore class

  const store = new MongoDbStore({
    uri: "mongodb://localhost:27017",
    databaseName: "online-shop", //same as our database
    collection: "session",
  });

  return store;
}

function createSessionConfig() {
  //return object , which has configuration(Settings) of the session to be created
  return {
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000, //2days
    },
  };
}

module.exports = createSessionConfig;

/* 1  we are defining  MongodbStore class.
   we are giving express-session as its argument, to construct class, based on structure of former.
   we are not creating any express-session object, it will be created in app.js 
   */
