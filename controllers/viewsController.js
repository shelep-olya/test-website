exports.getHomePage = (req, res) => {
  res.render("main", {
    title: "home",
    user: false,
  });
};
exports.getAboutPage = (req, res) => {
  res.render("about", {
    title: "about",
    user: false,
  });
};
exports.getTestPage = (req, res) => {
  res.render("test", {
    title: "test",
    user: false,
  });
};
exports.getResultsPage = (req, res) => {
  res.render("results", {
    title: "your results",
    user: false,
  });
};
exports.logIn = (req, res) => {
  res.render("login", { title: "log in", user: false });
};
exports.signUp = (req, res) => {
  res.render("signup", { title: "sign up", user: false });
};
