const express = require("express");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const userRouter = require("./routes/userRoutes");
const testRouter = require("./routes/testRoutes");
const viewsRouter = require("./routes/viewsRoutes");
const AppError = require("./utils/app-error");

const app = express();
app.use(helmet());
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("./public"));
app.use("/auth", userRouter);
app.use("/test", testRouter);
app.use("/", viewsRouter);

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests. Please try again in an hour.",
});
app.use("/", limiter);
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());
//ІНДЕКС ВІДПОВІДАЄ ЗА ШАБЛОН ЯКИЙ Я ТАК І НЕ ЗРОБИЛА. ЯКЩО ЗАХОЧЕШ ПОВЕРНУТИ НАЗАД
//ІНДЕКС УДАЛИ І ЗРОБИ МЕЙН ЧЕРЕЗ ПОВНОЦІННИЙ HTML + CHSNGE APP.GET
// app.get("/me.ejs", (req, res) => {
//   res.render("me");
// });
// app.get("/moreTests.ejs", (req, res) => {
//   res.render("moreTests");
// });
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
