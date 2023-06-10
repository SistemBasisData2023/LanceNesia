// router.js

const express = require("express");
const bcrypt = require("bcrypt");
const app = require("../middleware/middleware");
const db = require("../models/model");

const router = express.Router();

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
      const user = result.rows[0];
      if (user.status === "Banned") {
        // Jika status user adalah 'Banned', kirim respons 'false'
        res.send(false);
        console.log("Login gagal: akun diblokir");
      } else {
        // Jika user ditemukan, cocokkan password
        bcrypt.compare(password, user.password, (err, compareResult) => {
          if (compareResult === true) {
            // Jika password cocok, set session dan kirim respons 'true'
            req.session.username = username;
            res.send(true);
            console.log("Login berhasil");
          } else {
            // Jika password salah, kirim respons 'false'
            res.send(false);
            console.log("Login gagal: password salah");
          }
        });
      }
    } else {
      // Jika user tidak ditemukan, kirim respons 'false'
      res.send(false);
      console.log("Login gagal: user tidak ditemukan");
    }
  });
});

// Router 3: Proses register
router.post("/register", (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const phone = req.body.phone;
  const password = req.body.password;
  const age = " ";
  const domicile = " ";
  const short_profile = " ";
  const role = req.body.role;
  const status = "Active";

  // Hash password using bcrypt
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Insert new user into the database
    db.query(
      `INSERT INTO users (name, username, phone, password, cpassword, age, domicile, short_profile, role, status) VALUES ('${name}', '${username}', '${phone}','${hash}', '${password}', '${age}', '${domicile}', '${short_profile}', '${role}', '${status}' )`,
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
router.post("/deleteusers", (req, res) => {
  const users_id = req.body.users_id; // ID data yang akan dihapus

  // Mengubah referensi kunci asing di tabel "freelancer" menjadi NULL
  const updateQuery = `UPDATE freelancer SET user_id = NULL WHERE user_id = '${users_id}'`;

  // Query untuk menghapus data dari tabel "users"
  const deleteQuery = `DELETE FROM users WHERE user_id = '${users_id}'`;

  // Mengubah referensi kunci asing di tabel "freelancer" menjadi NULL terlebih dahulu
  db.query(updateQuery, (updateErr, updateResults) => {
    if (updateErr) {
      console.error("Error updating the foreign key reference: ", updateErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Menghapus data dari tabel "users" setelah mengubah referensi kunci asing di tabel "freelancer"
    db.query(deleteQuery, (deleteErr, deleteResults) => {
      if (deleteErr) {
        console.error("Error executing the delete query: ", deleteErr);
        res.status(500).send("Internal Server Error");
        return;
      }

      console.log("Data deleted successfully");
      res.end("done");
    });
  });
});

//router 5: melakukan pemngambilan data dari database
router.get("/getusers", (req, res) => {
  const query = "SELECT * FROM users"; // query ambil data
  // mendapatkan data dari database
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing the data retrieval query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results.rows); // Respond with the fetched data
    console.log("berhasil data");
  });
});

router.get("/getactivefreelance", (req, res) => {
  // Query to retrieve data from the users and freelancer tables with conditions
  const query = `
  SELECT users.user_id, name, username, category, expected_salary, experience, rating, image_url
  FROM users
  LEFT JOIN freelancer ON users.user_id = freelancer.user_id
  WHERE users.role = 'freelancer' AND (users.status IS NULL OR users.status != 'Banned') AND freelancer.user_id IS NOT NULL
  `;

  // Execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error retrieving data:", error);
      res.status(500).json({ error: "Error retrieving data" });
    } else {
      res.status(200).json(results.rows);
    }
  });
});

router.get("/getdatafreelance", (req, res) => {
  const { user_id } = req.query;

  // Query to retrieve data from the users and freelancer tables based on user_id
  const query = `
  SELECT *
  FROM users
  LEFT JOIN freelancer ON users.user_id = freelancer.user_id
  WHERE users.user_id = $1  
  `;

  // Execute the query with the user_id parameter
  db.query(query, [user_id], (error, results) => {
    if (error) {
      console.error("Error retrieving data:", error);
      res.status(500).json({ error: "Error retrieving data" });
    } else {
      res.status(200).json(results.rows);
    }
  });
});

router.get("/getdataclient", (req, res) => {
  const { user_id } = req.query;

  // Query to retrieve data from the users and freelancer tables based on user_id
  const query = `
  SELECT *
  FROM users
  LEFT JOIN client ON users.user_id = client.user_id
  WHERE users.user_id = $1  
  `;

  // Execute the query with the user_id parameter
  db.query(query, [user_id], (error, results) => {
    if (error) {
      console.error("Error retrieving data:", error);
      res.status(500).json({ error: "Error retrieving data" });
    } else {
      res.status(200).json(results.rows);
    }
  });
});

router.get("/getlistclient", (req, res) => {
  const query = "SELECT * FROM users WHERE role = 'client'"; // query ambil data
  // mendapatkan data dari database
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing the data retrieval query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results.rows); // Respond with the fetched data
    console.log("berhasil data");
  });
});

router.get("/getlistfreelance", (req, res) => {
  const query = "SELECT * FROM users WHERE role = 'freelancer'"; // query ambil data
  // mendapatkan data dari database
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing the data retrieval query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results.rows); // Respond with the fetched data
    console.log("berhasil data");
  });
});

router.post("/deleteprojects", (req, res) => {
  const project_id = req.body.project_id; // ID data yang akan dihapus
  console.log(project_id);
  const query = `DELETE FROM project WHERE project_id = '${project_id}'`; // query hapus data

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
router.get("/getprojects", (req, res) => {
  const query = "SELECT * FROM project"; // query ambil data proyek dengan client_id kosong
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

router.get("/getprojectsfree", (req, res) => {
  const query = "SELECT * FROM project WHERE project_id IS NULL OR status = 'DENIED' OR project_id NOT IN (SELECT project_id FROM project_freelancer)";
  // query ambil data proyek dengan client_id kosong atau tidak ada di project_freelance

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

router.get("/getUsernameByProjectId", async (req, res) => {
  try {
    const { project_id } = req.query;

    // Menggunakan query SQL JOIN untuk mengambil freelancer_id dan nama pengguna (users.name)
    const query = `
    SELECT name, freelancer_id
    FROM PROJECT_FREELANCER
    JOIN users ON PROJECT_FREELANCER.freelancer_id = users.user_id
    WHERE PROJECT_FREELANCER.project_id = $1
    `;
    const values = [project_id];

    const result = await db.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getUsernameClient", async (req, res) => {
  try {
    const { project_id } = req.query;

    // Menggunakan query SQL JOIN untuk mengambil freelancer_id dan nama pengguna (users.name)
    const query = `
    SELECT *
    FROM PROJECT
    RIGHT JOIN PROJECT_FREELANCER ON PROJECT.project_id = PROJECT_FREELANCER.project_id
    JOIN CLIENT ON PROJECT.client_id = CLIENT.user_id
    JOIN USERS ON CLIENT.user_id = USERS.user_id
    WHERE freelancer_id = $1;
    `;
    const values = [req.query.freelancer_id];

    const result = await db.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/projectfreelancer", (req, res) => {
  const { project_id, freelancer_id } = req.body;

  const checkQuery = "SELECT * FROM project_freelancer WHERE project_id = $1 AND freelancer_id = $2";
  db.query(checkQuery, [project_id, freelancer_id], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error executing the SELECT query: ", checkErr);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (checkResult.rows.length > 0) {
      res.status(400).send("Data already exists");
      return;
    }

    const insertQuery = "INSERT INTO project_freelancer (project_id, freelancer_id) VALUES ($1, $2)";
    db.query(insertQuery, [project_id, freelancer_id], (insertErr, insertResult) => {
      if (insertErr) {
        console.error("Error executing the INSERT query: ", insertErr);
        res.status(500).send("Internal Server Error");
        return;
      }

      const updateQuery = "UPDATE project SET status = 'PENDING' WHERE project_id = $1";
      db.query(updateQuery, [project_id], (updateErr, updateResult) => {
        if (updateErr) {
          console.error("Error executing the UPDATE query: ", updateErr);
          res.status(500).send("Internal Server Error");
          return;
        }

        res.status(201).send("Data inserted successfully");
      });
    });
  });
});

router.post("/deleteprojectsfreelance", (req, res) => {
  const project_id = req.body.project_id; // ID data yang akan dihapus
  const freelance_id = req.body.freelance_id; // ID freelancer yang sesuai

  const deleteQuery = `DELETE FROM project_freelancer WHERE project_id = '${project_id}' AND freelancer_id = '${freelance_id}'`; // query hapus data

  const updateQuery = `UPDATE project SET status = 'PENDING' WHERE project_id = '${project_id}'`; // query update status

  db.query(deleteQuery, (err, deleteResult) => {
    if (err) {
      console.error("Error executing the delete query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    db.query(updateQuery, (err, updateResult) => {
      if (err) {
        console.error("Error executing the update query: ", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      console.log("Data deleted successfully");
      res.end("done");
    });
  });
});

router.put("/updatedatafreelancer", (req, res) => {
  const { user_id, name, username, phone, password, cpassword, age, domicile, short_profile, category, experience, expected_salary, image_url } = req.body;
  console.log(req.body);
  const updateUserQuery = `
    UPDATE users
    SET name = $2, username = $3, phone = $4, password = $5, cpassword = $6, age = $7, domicile = $8, short_profile = $9, image_url = $10
    WHERE user_id = $1
  `;

  const updateFreelancerQuery = `
    INSERT INTO freelancer (user_id, category, experience, expected_salary)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (user_id) DO UPDATE
    SET category = $2, experience = $3, expected_salary = $4
  `;

  db.query(updateUserQuery, [user_id, name, username, phone, password, cpassword, age, domicile, short_profile, image_url], (error, userResult) => {
    if (error) {
      console.error("Error updating user data:", error);
      res.status(500).json({ error: "Error updating user data" });
    } else {
      db.query(updateFreelancerQuery, [user_id, category, experience, expected_salary], (error, freelancerResult) => {
        if (error) {
          console.log("user ID: ", user_id);
          console.error("Error updating/inserting freelancer data:", error);
          res.status(500).json({ error: "Error updating/inserting freelancer data" });
        } else {
          res.status(200).json({ message: "Data updated successfully" });
        }
      });
    }
  });
});

router.put("/updateTotalRating", (req, res) => {
  const { rated, user_id } = req.body;
  console.log(req.body);
  const query = `
  UPDATE freelancer
  SET temporary_rate = temporary_rate + $1,
      total_rating = total_rating + 1,
      rating = CAST(((temporary_rate + $1) / (total_rating + 1)) AS NUMERIC(10, 1))
  WHERE user_id = $2`;

  const values = [rated, user_id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing the update query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log("Total rating updated successfully");
    res.send("Total rating updated successfully");
  });
});

router.put("/updatedataclient", (req, res) => {
  const { user_id, name, username, phone, password, cpassword, age, domicile, short_profile, company_name, image_url } = req.body;
  console.log(req.body);
  const updateUserQuery = `
    UPDATE users
    SET name = $2, username = $3, phone = $4, password = $5, cpassword = $6, age = $7, domicile = $8, short_profile = $9, image_url = $10
    WHERE user_id = $1
  `;

  const updateClientQuery = `
    INSERT INTO client (user_id, company_name)
    VALUES ($1, $2)
    ON CONFLICT (user_id) DO UPDATE
    SET company_name = $2
  `;

  db.query(updateUserQuery, [user_id, name, username, phone, password, cpassword, age, domicile, short_profile, image_url], (error, userResult) => {
    if (error) {
      console.error("Error updating user data:", error);
      res.status(500).json({ error: "Error updating user data" });
    } else {
      db.query(updateClientQuery, [user_id, company_name], (error, clientResult) => {
        if (error) {
          console.log("user ID: ", user_id);
          console.error("Error updating/inserting client data:", error);
          res.status(500).json({ error: "Error updating/inserting client data" });
        } else {
          res.status(200).json({ message: "Data updated successfully" });
        }
      });
    }
  });
});

router.put("/updateprojects/:project_id", (req, res) => {
  console.log("Update project with id: ", req.params.project_id);
  const project_id = req.params.project_id;
  const { project_name, timeline, job_description, status, duration, price } = req.body;

  const query = `
      UPDATE project 
      SET project_name = $1, 
          timeline = $2, 
          job_description = $3,  
          status = $4,
          duration = $5,
          price = $6
      WHERE project_id = $7
      RETURNING *
    `;

  const values = [project_name, timeline, job_description, status, duration, price, project_id];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error executing the update query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    if (results.rowCount === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.json(results.rows[0]); // Respond with the updated user
  });
});

router.get("/getreports", (req, res) => {
  const query = "SELECT * FROM report"; // query ambil data
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

router.get("/getprojectsone", (req, res) => {
  const project_id = req.query.project_id; // Menggunakan req.query untuk mendapatkan query parameter
  console.log("projectID", project_id);
  const query = `
  SELECT project.*, client.*
  FROM project
  LEFT JOIN client ON project.client_id = client.user_id
  WHERE project.project_id = $1`; // Menggunakan parameterized query
  const values = [project_id];

  // mendapatkan data dari database
  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error executing the data retrieval query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results.rows); // Respond with the fetched data
  });
});

router.get("/getprojectsclient", (req, res) => {
  const client_id = req.query.client_id; // Menggunakan req.query untuk mendapatkan query parameter
  console.log("projectID", client_id);
  const query = `SELECT * FROM project WHERE client_id = $1`; // Menggunakan parameterized query
  const values = [client_id];

  // mendapatkan data dari database
  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error executing the data retrieval query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results.rows); // Respond with the fetched data
  });
});

router.get("/getprojectshire", (req, res) => {
  const client_id = req.query.client_id;
  console.log("client_id", client_id);
  const query = `
    SELECT project.*, project_freelancer.*
    FROM project
    LEFT JOIN project_freelancer ON project.project_id = project_freelancer.project_id
    WHERE project.client_id = $1 AND project_freelancer.freelancer_id IS NULL`;
  const values = [client_id];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error executing the data retrieval query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results.rows);
  });
});

router.get("/getprojectsfreelancer", async (req, res) => {
  try {
    const freelancerId = req.query.freelancer_id;
    const query = `SELECT * FROM PROJECT RIGHT JOIN PROJECT_FREELANCER ON PROJECT.project_id = PROJECT_FREELANCER.project_id WHERE freelancer_id= $1`;
    const values = [freelancerId];

    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/deletereports", (req, res) => {
  const report_id = req.body.report_id; // ID data yang akan dihapus
  console.log(report_id);
  const query = `DELETE FROM report WHERE report_id = '${report_id}'`; // query hapus data

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

router.get("/getreportsone", (req, res) => {
  const report_id = req.query.report_id; // Menggunakan req.query untuk mendapatkan query parameter
  console.log("reportID", report_id);
  const query = `SELECT * FROM report WHERE report_id = $1`; // Menggunakan parameterized query
  const values = [report_id];

  // mendapatkan data dari database
  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error executing the data retrieval query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results.rows); // Respond with the fetched data
  });
});

router.post("/makeprojects", async (req, res) => {
  try {
    const { client_id, project_name, timeline, job_description, duration, price, image_url } = req.body;

    // Query untuk menyimpan data proyek baru ke database
    const query = `
      INSERT INTO PROJECT (client_id, project_name, timeline, job_description, duration, price, image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [client_id, project_name, timeline, job_description, duration, price, image_url];

    // Jalankan query menggunakan koneksi pool
    const result = await db.query(query, values);

    res.status(201).json(result.rows[0]); // Mengembalikan data proyek yang berhasil ditambahkan
  } catch (error) {
    console.error("Error while inserting project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Handler untuk route POST /reports
router.post("/makereport", async (req, res) => {
  try {
    const { username_report, message } = req.body;

    // Cek apakah username_report ada dalam tabel users
    const userQuery = "SELECT user_id FROM users WHERE username = $1";
    const userResult = await db.query(userQuery, [username_report]);

    const reporterId = userResult.rows[0].user_id;

    // Simpan laporan ke tabel reports
    const reportQuery = "INSERT INTO report (reporter_id, username_report, message) VALUES ($1, $2, $3)";
    await db.query(reportQuery, [reporterId, username_report, message]);

    return res.status(200).json({ message: "Report created successfully" });
  } catch (error) {
    console.error("Error creating report:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

router.put("/updatereports/:report_id", (req, res) => {
  console.log("Update report with id: ", req.params.report_id);
  const report_id = req.params.report_id;
  const { reporter_id, message, status } = req.body;

  const query = `
      UPDATE report 
      SET reporter_id = $1, 
          message = $2, 
          status = $3
      WHERE report_id = $4
      RETURNING *
    `;

  const values = [reporter_id, message, status, report_id];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error executing the update query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    if (results.rowCount === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.json(results.rows[0]); // Respond with the updated user
  });
});

router.get("/getprofile", (req, res) => {
  const username = req.body.username; // query ambil data
  console.log(username);
  const query = `SELECT * FROM users WHERE username = '${username}'`; // query ambil data
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

router.get("/getusersone", (req, res) => {
  const user_id = req.query.user_id; // Menggunakan req.query untuk mendapatkan query parameter
  console.log("userID", user_id);
  const query = `SELECT * FROM users WHERE user_id = $1`; // Menggunakan parameterized query
  const values = [user_id];

  // mendapatkan data dari database
  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error executing the data retrieval query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results.rows); // Respond with the fetched data
  });
});

router.put("/updateprofile/:user_id", (req, res) => {
  console.log("Update user with id: ", req.params.user_id);
  const user_id = req.params.user_id;
  const { name, username, phone, age, domicile, short_profile } = req.body;

  const query = `
      UPDATE users 
      SET name = $1, 
          username = $2, 
          phone = $3,  
          age = $4, 
          domicile = $5, 
          short_profile = $6
      WHERE user_id = $7
      RETURNING *
    `;

  const values = [name, username, phone, age, domicile, short_profile, user_id];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error executing the update query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    if (results.rowCount === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.json(results.rows[0]); // Respond with the updated user
  });
});

router.put("/updateusers/:user_id", (req, res) => {
  console.log("Update user with id: ", req.params.user_id);
  const user_id = req.params.user_id;
  const { name, username, phone, domicile, age, status, role, short_profile, cpassword } = req.body;

  const query = `
      UPDATE users 
      SET name = $1, 
          username = $2, 
          phone = $3,  
          domicile = $4, 
          age = $5,
          status = $6,
          role = $7, 
          short_profile = $8,
          cpassword = $9
      WHERE user_id = $10
      RETURNING *
    `;

  const values = [name, username, phone, domicile, age, status, role, short_profile, cpassword, user_id];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error executing the update query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    if (results.rowCount === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.json(results.rows[0]); // Respond with the updated user
  });
});

router.get("/getexperience", (req, res) => {
  const freelancer_id = req.body.freelancer_id; // query ambil data
  console.log(freelancer_id);
  const query = `SELECT * FROM freelancer_experience WHERE freelancer_id = '${freelancer_id}'`; // query ambil data
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

router.post("/getstatus", (req, res) => {
  const username = req.body.username;

  console.log(username);
  console.log("fetching role");

  const query = `SELECT role, name, user_id FROM users WHERE username = '${username}'`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing the data retrieval query: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results.rows);
    console.log(results.rows);
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

module.exports = router;
