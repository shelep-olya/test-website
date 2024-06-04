const express = require("express");
const rateLimit = require("express-rate-limit");
const { postResFunc } = require("./utils/test-functionallity");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");
const testRouter = require("./routes/testRoutes");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("./public"));
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests. Please try again in an hour.",
});
app.use("/", limiter);
app.use("/auth", userRouter);
app.use("/", testRouter);

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

app.get("/welcome.ejs", (req, res) => {
  res.render("welcome");
});
app.get("/home.ejs", (req, res) => {
  res.render("home");
});
app.get("/createTest.ejs", (req, res) => {
  res.render("createTest");
});
app.get("/moreTests.ejs", (req, res) => {
  res.render("moreTests");
});

app.post("/submit", (req, res) => postResFunc(req, res));

module.exports = app;
