const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MYSQL connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node-with-mysql",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting db", err.stack);
    return;
  }
  console.log("Connected with MYSQL DB");
});

// read all contacts
app.get("/contacts", (req, res) => {
  db.query("select * from contacts", (err, rows) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(rows);
  });
});

// read single contact
app.get("/contacts/:id", (req, res) => {
  db.query("select * from contacts where id=?", [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (row.length === 0) return res.status(404).send("Record not found.");
    res.send(row[0]);
  });
});

// add new contact
app.post("/contacts", (req, res) => {
  const { first_name, last_name, email, phone, address } = req.body;

  const sql =
    "INSERT into contacts(first_name, last_name, email, phone, address) values(?,?,?,?,?)";
  db.query(
    sql,
    [first_name, last_name, email, phone, address],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send({
        message: "Contact created",
        id: result.insertId,
      });
    }
  );
});

// update contact
app.put("/contacts/:id", (req, res) => {
  const { first_name, last_name, email, phone, address } = req.body;

  const sql =
    "UPDATE contacts SET first_name=? , last_name=?, email=?, phone=?, address=? where id=?";
  db.query(
    sql,
    [first_name, last_name, email, phone, address, req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (result.affectedRows === 0)
        return res.status(404).send("Record not found.");

      res.send({
        message: "Contact updated",
      });
    }
  );
});

// delete single contact
app.delete("/contacts/:id", (req, res) => {
  db.query(
    "DELETE from contacts where id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0)
        return res.status(404).send("Contact not found.");
      res.send({ message: "Contact deleted" });
    }
  );
});

app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen(3000, () => {
  console.log(`Server is running on port: http://localhost:3000`);
});
