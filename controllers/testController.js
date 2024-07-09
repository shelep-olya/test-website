const Test = require("./../models/finalTestModel");
const catchAsync = require("./../utils/catch-async");
const handlerFactory = require("./handlerFactory");

exports.addNumberOfQuestions = (req, res) => {
  const numberOfQuestions = req.body.numberOfQuestions;
  const numberOfResults = req.body.numberOfResults;
  res.render("testBlocks", { numberOfQuestions, numberOfResults, user: true });
};

exports.submitTest = catchAsync(async (req, res, next) => {
  const {
    numberOfQuestions,
    questions,
    name,
    author,
    description,
    numberOfResults,
    results,
  } = req.body;
  if (!questions || !Array.isArray(questions)) {
    return res.status(400).send("Questions are required and must be an array.");
  }
  const testBlocks = questions.map((question) => ({
    question: question.question,
    answers: question.answers,
  }));

  const newTest = await Test.create({
    name,
    numberOfQuestions: parseInt(numberOfQuestions, 10),
    testBlocks,
    author,
    description,
    numberOfResults: parseInt(numberOfResults, 10),
    results: Array.isArray(results) ? results : [],
  });

  await newTest.save();
  res.status(201).redirect("home");
});
exports.getMoreTests = catchAsync(async (req, res, next) => {
  try {
    const tests = await Test.find(); // Assuming Test is your Mongoose model
    res.render("moreTests", { tests, user: true }); // Pass tests to the EJS template
  } catch (err) {
    console.error("Error fetching tests:", err);
    // Handle error appropriately, e.g., return an error page
    res.status(500).send("Error fetching tests");
  }
});
exports.deleteTest = handlerFactory.deleteOne(Test);
exports.getTest = handlerFactory.getOne(Test);
