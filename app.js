const express = require("express");
const { postResFunc } = require("./utils/test-functionallity");
const path = require("path");
const bodyParser = require("body-parser");
const authController = require("./controllers/authController");
const userRouter = require("./routes/userRoutes");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public/styles"));

app.use("/auth", userRouter);

app.get("/", (req, res) => {
  res.render("main");
});

app.get("/test.ejs", (req, res) => {
  res.render("test");
});

app.get("/about.ejs", (req, res) => {
  res.render("about");
});

app.get("/main.ejs", (req, res) => {
  res.render("main");
});
app.get("/results.ejs", (req, res) => {
  res.render("results");
});
app.get("/login.ejs", (req, res) => {
  res.render("login");
});
app.get("/signup.ejs", (req, res) => {
  res.render("signup");
});
app.post("/submit", (req, res) => postResFunc(req, res));

module.exports = app;
