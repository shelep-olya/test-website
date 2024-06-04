const app = require("./../app");
const { postResFunc } = require("./utils/test-functionallity");

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
exports.app.get("/", (req, res) => {
  res.render("main");
});

exports.app.get("/test.ejs", (req, res) => {
  res.render("test");
});

exports.app.get("/about.ejs", (req, res) => {
  res.render("about");
});

exports.app.get("/main.ejs", (req, res) => {
  res.render("main");
});
exports.app.get("/results.ejs", (req, res) => {
  res.render("results");
});
exports.app.get("/login.ejs", (req, res) => {
  res.render("login");
});
exports.app.get("/signup.ejs", (req, res) => {
  res.render("signup");
});

exports.app.get("/welcome.ejs", (req, res) => {
  res.render("welcome");
});
exports.app.get("/home.ejs", (req, res) => {
  res.render("home");
});

exports.app.post("/submit", (req, res) => postResFunc(req, res));
