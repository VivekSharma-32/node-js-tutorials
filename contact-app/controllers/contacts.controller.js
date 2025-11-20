import Contact from "../models/contacts.model.js";
import mongoose from "mongoose";

export const getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    const result = await Contact.paginate({}, options);
    // res.json(contacts);
    // res.send(result);
    res.render("home", {
      totalDocs: result.totalDocs,
      limit: result.limit,
      totalPages: result.totalPages,
      currentPage: result.page,
      counter: result.pagingCounter,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      contacts: result.docs,
    });
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const getContact = async (req, res) => {
  var paramId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!paramId) {
    return res.render("404", { message: "Invalid ID" });
  }

  try {
    const contact = await Contact.findById({ _id: req.params.id });
    if (!contact) {
      return res.render("404", { message: "Contact Not Found" });
    }
    res.render("show-contact", { contact });
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const addContactPage = async (req, res) => {
  try {
    res.render("add-contact");
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const addContact = async (req, res) => {
  try {
    await Contact.create(req.body);
    res.redirect("/");
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const updateContactPage = async (req, res) => {
  var paramId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!paramId) {
    return res.render("404", { message: "Invalid ID" });
  }
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.render("404", { message: "Contact Not Found" });
    }
    res.render("update-contact", { contact });
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const updateContact = async (req, res) => {
  var paramId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!paramId) {
    return res.render("404", { message: "Invalid ID" });
  }
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body);
    if (!contact) {
      return res.render("404", { message: "Contact Not Found" });
    }
    res.redirect("/");
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const deleteContact = async (req, res) => {
  var paramId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!paramId) {
    return res.render("404", { message: "Invalid ID" });
  }
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.render("404", { message: "Contact Not Found" });
    }
    res.redirect("/");
  } catch (error) {
    res.render("500", { message: error });
  }
};
