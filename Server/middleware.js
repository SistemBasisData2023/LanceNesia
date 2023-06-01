// middleware.js

//import packages
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

//initialize the app as an express app
const app = express();

// Middleware (session)
app.use(
  session({
    secret: "secret example gess",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

module.exports = app;
