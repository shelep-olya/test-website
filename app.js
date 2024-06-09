const express = require("express");
const rateLimit = require("express-rate-limit");
const { postResFunc } = require("./utils/test-functionallity");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");
const testRouter = require("./routes/testRoutes");
const viewsRouter = require("./routes/viewsRoutes");
//ІНДЕКС ВІДПОВІДАЄ ЗА ШАБЛОН ЯКИЙ Я ТАК І НЕ ЗРОБИЛА. ЯКЩО ЗАХОЧЕШ ПОВЕРНУТИ НАЗАД
//ІНДЕКС УДАЛИ І ЗРОБИ МЕЙН ЧЕРЕЗ ПОВНОЦІННИЙ HTML + CHSNGE APP.GET
const app = express();

// Nалаштування шаблонів EJS
app.set("view engine", "ejs");

// Парсери для даних
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Статичні файли
app.use(express.static("./public"));

// Ліміт запитів
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000, // 1 година
  message: "Too many requests. Please try again in an hour.",
});
app.use("/", limiter);

// Маршрути
app.use("/auth", userRouter);
app.use("/test", testRouter);
app.use("/", viewsRouter);

// Головна сторінка
// app.get("/" || "/main", (req, res) => {
//   const locals = "home";

//   res.render("main", { locals });
// });

// app.get("/me.ejs", (req, res) => {
//   res.render("me");
// });
// app.get("/moreTests.ejs", (req, res) => {
//   res.render("moreTests");
// });
// app.get("/about.ejs", (req, res) => {
//   res.render("about");
// });
// app.get("/results.ejs", (req, res) => {
//   res.render("results");
// });
// app.get("/test.ejs", (req, res) => {
//   res.render("test");
// });
// app.get("/login.ejs", (req, res) => {
//   res.render("login");
// });
// app.get("/signup.ejs", (req, res) => {
//   res.render("signup");
// });
// app.get("/welcome.ejs", (req, res) => {
//   res.render("welcome");
// });
// app.get("/home.ejs", (req, res) => {
//   res.render("home");
// });
// app.get("/createTest.ejs", (req, res) => {
//   res.render("createTest", { numQuestions: 0 }); // Ensure numQuestions is passed
// });

// app.post("/create-test-step1", (req, res) => {
//   const numQuestions = req.body.numQuestions;
//   res.render("createTest", { numQuestions: numQuestions });
// });

// app.post("/submit", (req, res) => postResFunc(req, res));

module.exports = app;
