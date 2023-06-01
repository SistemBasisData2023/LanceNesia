// model.js

const { Client } = require("pg");
const bcrypt = require("bcrypt");

// Insiasi koneksi ke database
const db = new Client({
  user: "abdulfikihk",
  host: "ep-wispy-frost-810469.ap-southeast-1.aws.neon.tech",
  database: "test_PP",
  password: "wX7HcPyCLVh3",
  port: 5432,
  sslmode: "require",
  ssl: true,
});

db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Tehubung ke database abdul_9");
});

module.exports = db;
