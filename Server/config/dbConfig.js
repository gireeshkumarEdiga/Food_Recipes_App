const mongoose = require("mongoose");


//connection logic
mongoose.connect(process.env.CONN_STRING)

//connection state
const db = mongoose.connection;

db.on("connected",() => {
    console.log("DB Connection Successfully");
});

db.on("error",() => {
    console.log("DB Connection Failed");
});

module.exports = db;