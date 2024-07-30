const path = require("path");
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const testRouter = require("./routes/testRoutes");
const authRouter = require("./routes/authRoutes");
const viewsRouter = require("./routes/viewsRoutes");
const AppError = require("./utils/app-error");
const app = express();
app.set("view engine", "ejs");
app.set("layout", "./layouts/index");
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(expressLayout);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/auth", userRouter);
app.use("/", testRouter);
app.use("/", authRouter);
app.use("/", viewsRouter);
app.use(express.urlencoded({ extended: true }));
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests. Please try again in an hour.",
});
app.use("/", limiter);
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
