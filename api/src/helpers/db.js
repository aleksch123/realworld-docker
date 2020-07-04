const mongoose = require("mongoose");
const { db } = require("../configuration");
const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  }

module.exports.connectDb = () => {
  mongoose.connect(db, options).then(()=>{
    console.log('MongoDB is connected')
  }).catch(err=>{
  console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
  setTimeout(connectWithRetry, 5000)
  })
  return mongoose.connection;
};



