//import packages
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

//initialize the app as an express app
const app = express();
const router = express.Router();
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
var temp;

//ROUTERS

// Router 1: Menampilkan landing page (login/register)
router.get("/", (req, res) => {
  const temp = req.session;
  if (temp.username && temp.visits) {
    // Jika user terdaftar maka akan masuk ke halaman admin
    return res.redirect("/FindJobs");
  } else {
    // Render login/register page
    temp.visits = 1;
    res.redirect("/FindJobs"); // Ganti "login-register" dengan nama template halaman yang ingin ditampilkan
  }
});

//Router 2: Melakukan Login
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Cari user di database berdasarkan username
  db.query(`SELECT * FROM users WHERE username='${username}'`, (err, result) => {
    if (err) throw err;
    if (result.rows.length > 0) {
      // Jika user ditemukan, cocokkan password
      bcrypt.compare(password, result.rows[0].password, (err, compareResult) => {
        if (compareResult === true) {
          // Jika password cocok, set session dan kirim respons 'true'
          req.session.username = username;
          res.send(true);
          console.log("Login successful");
        } else {
          // Jika password salah, kirim respons 'false'
          res.send(false);
          console.log("Login password salah");
        }
      });
    } else {
      // Jika user tidak ditemukan, kirim respons 'false'
      res.send(false);
      console.log("Login user tidak ditemukan");
    }
  });
});

// Router 3: Proses register
router.post("/register", (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const phone = req.body.phone;
  const password = req.body.password;
  const age = req.body.age;
  const domicile = req.body.domicile;
  const short_profile = req.body.short_profile;
  const role = req.body.role;

  // Hash password using bcrypt
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Insert new user into the database
    db.query(
      `INSERT INTO users (name, username, phone, password, cpassword, age, domicile, short_profile, role) VALUES ('${name}', '${username}', '${phone}','${hash}', '${password}', '${age}', '${domicile}', '${short_profile}', '${role}' )`,
      (err, result) => {
        if (err) {
          console.error("Error inserting new user:", err);
          res.send(false); // Registration failed, send 'failed' response
          return;
        }
        // Set session and send 'done' response
        req.session.username = username;
        res.send(true);
      }
    );
  });
});

//router 4: melakukan delete data dari database
router.post("/delete", (req, res) => {
  const id = req.body.id; // ID data yang akan dihapus
  const query = `DELETE FROM users WHERE user_id = ${id}`; // query hapus data

  //menghapus data_gaming berdasarkan id
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing the delete query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    console.log("Data deleted successfully");
    res.end("done");
  });
});

//router 5: melakukan pemngambilan data dari database
router.post("/getdata", (req, res) => {
  const query = "SELECT * FROM users"; // query ambil data
  // mendapatkan data dari database
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing the data retrieval query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results.rows); // Respond with the fetched data
  });
});

router.post("/getdataone", (req, res) => {
  const username = req.body.username; // query ambil data
  const query = `SELECT * FROM users WHERE username = ${username}`; // query ambil data
  // mendapatkan data dari database
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing the data retrieval query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results.rows); // Respond with the fetched data
  });
});

//Router 7: menghapus session
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Session deleted");
    res.send(`
        <script>
          alert("Logout Successful");
          window.location.href = "/";
        </script>
      `);
  });
});

app.use("/", router);
app.listen(process.env.PORT || 5000, () => {
  console.log(`App Started on PORT ${process.env.PORT || 5000}`);
});
