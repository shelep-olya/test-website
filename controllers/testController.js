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
    numberOfQuestions: parseInt(numberOfQuestions, 10), // Ensure numberOfQuestions is a number
    testBlocks,
    author,
    description,
    numberOfResults: parseInt(numberOfResults, 10), // Ensure numberOfResults is a number
    results: Array.isArray(results) ? results : [], // Ensure results is an array
  });

  await newTest.save();
  res.status(201).redirect("home");
});
exports.getAllTests = catchAsync(async (req, res, next) => {
  const tests = await Test.find();
  if (!tests.length) {
    return res.status(404).render("moreTests", {
      title: "More tests",
      tests: [],
      user: true,
      message: "No tests found",
    });
  }
  res.status(200).render("moreTests", {
    data: tests,
    user: true,
  });
});
exports.deleteTest = handlerFactory.deleteOne(Test);
exports.getTest = handlerFactory.getOne(Test);
