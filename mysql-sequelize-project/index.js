const express = require("express");
const sequelize = require("./models/index");
const Contact = require("./models/contacts");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MYSQL connection
sequelize
  .sync()
  .then(() => console.log("Database * Tables Created"))
  .catch((err) => console.log("Error", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get all contacts
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    return res.json(contacts);
  } catch (error) {
    return res.status(500).send("Error getting contacts");
  }
});

// get single contacts
app.get("/contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }
    return res.json(contact);
  } catch (error) {
    return res.status(500).send("Error getting contacts");
  }
});

// add new contact
app.post("/contact", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.json(contact);
  } catch (error) {
    return res.status(500).send("Error adding contacts");
  }
});

// update contact
app.put("/contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }
    await contact.update(req.body, { where: { id: req.params.id } });
    const updated_contact = await contact.findByPk(req.params.id);
    res.json(updated_contact);
  } catch (error) {
    return res.status(500).send("Error updating contacts");
  }
});

// delete contact
app.delete("/contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }
    await contact.destroy();
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    return res.status(500).send("Error deleting contacts");
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port: http://localhost:3000`);
});
