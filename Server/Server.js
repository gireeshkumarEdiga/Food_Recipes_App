const dotenv = require("dotenv");
dotenv.config({path : "./config.env"});

const dbconfig = require("./config/dbConfig");

const server = require("./app");

const PORT = Number(process.env.PORT_NUMBER) || 8000;

server.listen(PORT,() => {
    console.log("Server is Running on PORT "+PORT);
});