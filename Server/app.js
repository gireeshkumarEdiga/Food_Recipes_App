const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();

app.use(cors());

const RecipeRoutes = require("./Router/RecipeRoutes");
const AuthRoutes = require("./Router/AuthRoutes");

app.use(express.json());

app.use("/api/Recipes",RecipeRoutes);
app.use("/api/Auth",AuthRoutes)

const server = http.createServer(app);

module.exports = server;