require("dotenv").config();
const { Client } = require("pg");
const bcrypt = require("bcrypt");

// Insiasi koneksi ke database
const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  sslmode: process.env.DB_SSL_MODE,
  ssl: process.env.DB_SSL === "true",
});

db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Terhubung ke database", process.env.DB_NAME);
});

module.exports = db;
