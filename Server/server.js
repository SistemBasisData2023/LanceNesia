// index.js

const express = require("express");
const app = require("./middleware/middleware");
const router = require("./router/router");

// Menggunakan router sebagai middleware
app.use("/", router);

// Menjalankan server
app.listen(5000, () => {
  console.log("Server berjalan pada port 5000");
});
