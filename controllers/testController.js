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
exports.getAllTestsOfOne = catchAsync(async (req, res, next) => {
  const id = req.body.id;
  const tests = await Test.findById(id); // Ensure await here to fetch data
  if (!tests) {
    return res.status(404).send("No tests found"); // Handle case where no tests are found
  }
  res.status(200).render("myTests", {
    user: true,
    tests: [tests], // Ensure tests is passed as an array
  });
});
exports.deleteTest = handlerFactory.deleteOne(Test);
exports.getTest = handlerFactory.getOne(Test);
