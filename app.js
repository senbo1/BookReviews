const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Book = require("./models/Book");
const methodOverride = require("method-override");

mongoose
  .connect("mongodb://127.0.0.1/book-reviews")
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log(error));

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/books", async (req, res) => {
  const books = await Book.find({});
  res.render("books/index", { books });
});

app.get("/books/new", async (req, res) => {
  res.render("books/new");
});

app.get("/books/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render("books/show", { book });
});

app.get("/books/:id/edit", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render("books/edit", { book });
});

app.post("/books", async (req, res) => {
  const book = new Book(req.body.book);
  await book.save();
  res.redirect(`/books/${book._id}`);
});

app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndUpdate(id, { ...req.body.book });
  res.redirect(`/books/${id}`);
});

app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.redirect("/books");
});

app.listen(3000, () => {
  console.log("Serving on PORT 3000!");
});
