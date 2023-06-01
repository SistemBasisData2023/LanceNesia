// middleware/session.js
const session = require("express-session");

const sessionMiddleware = session({
  secret: "secret example gess",
  saveUninitialized: false,
  resave: false,
});

module.exports = sessionMiddleware;
