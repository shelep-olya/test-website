const path = require("path");
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const userRouter = require("./routes/userRoutes");
const testRouter = require("./routes/testRoutes");
const authRouter = require("./routes/authRoutes");
const viewsRouter = require("./routes/viewsRoutes");
const AppError = require("./utils/app-error");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const { publicDecrypt } = require("crypto");

const app = express();
app.set("view engine", "ejs");
app.set("layout", "./layouts/index");

app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(expressLayout);
const store = new MongoDBSession({
  uri: process.env.DATABASE,
  collection: "sessions",
});
app.use(
  session({
    secret: process.env.JWT_SECRET,
    saveUninitialized: false,
    resave: false,
    store: store,
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
