const shuffleArray = (array) => {
  let shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

const postResFunc = (req, res, resultsArray, id) => {
  const shuffledResults = shuffleArray(resultsArray);
  const n = Math.floor(Math.random() * shuffledResults.length);
  const resMessage = shuffledResults[n];

  res.render("results", { resMessage, user: false, id });
};

const authPostResFunc = (req, res, resultsArray, id) => {
  const shuffledResults = shuffleArray(resultsArray);
  const n = Math.floor(Math.random() * shuffledResults.length);
  const resMessage = shuffledResults[n];

  res.render("authResults", { resMessage, user: true, id });
};
module.exports = postResFunc;
module.exports = authPostResFunc;
