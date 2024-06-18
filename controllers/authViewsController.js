exports.getMe = (req, res) => {
  res.render("me", {
    title: "my account",
    user: true,
  });
};
exports.getMoreTests = (req, res) => {
  res.render("moreTests", {
    title: "more tests",
    user: true,
  });
};
exports.getQuestionForm = (req, res) => {
  res.render("questionForm", {
    title: "create your own test",
    user: true,
  });
};
exports.getWelcomePage = (req, res) => {
  res.render("welcome", {
    title: welcome,
    user: true,
  });
};
exports.getHomePage = (req, res) => {
  res.render("home", {
    title: "home",
    user: true,
  });
};
