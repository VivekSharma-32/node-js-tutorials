import express from "express";
import {
  addContact,
  addContactPage,
  deleteContact,
  getAllContacts,
  getContact,
  updateContact,
  updateContactPage,
} from "../controllers/contacts.controller.js";

const router = express.Router();
router.get("/", getAllContacts);

router.get("/show-contact/:id", getContact);

router.get("/add-contact", addContactPage);

router.post("/add-contact", addContact);

router.get("/update-contact/:id", updateContactPage);

router.post("/update-contact/:id", updateContact);

router.get("/delete-contact/:id", deleteContact);

export default router;
