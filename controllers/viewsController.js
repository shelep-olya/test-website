const { postResFunc } = require("../utils/test-functionallity");
exports.getHomePage = (req, res) => {
  res.render("main", {
    title: "home",
  });
};
exports.getAboutPage = (req, res) => {
  res.render("about", {
    title: "about",
  });
};
exports.getTestPage = (req, res) => {
  res.render("test", {
    title: "test",
  });
};
exports.getResultsPage = (req, res) => {
  res.render("results", {
    title: "your results",
  });
};
exports.logIn = (req, res) => {
  res.render("login", { title: "log in" });
};
exports.signUp = (req, res) => {
  res.render("signup", { title: "sign up" });
};
exports.submitBTN = (req, res) => postResFunc(req, res);
