const postResFunc = (req, res) => {
  let messages = [
    "Congratulations, you're НЕТАКУСЯ",
    "Congratulation, you're Теліга",
    "Нич собі ви цікава людинка",
    "демн fuck me babe",
    "обнять і плакать",
    "целую в плєчі і до встрєчі",
    "Congratulations, you're the best person i've ever met",
  ];
  let n = Math.floor(Math.random() * messages.length);

  let resMessage = messages[n];

  res.render("results", { resMessage });
};

module.exports = { postResFunc };
