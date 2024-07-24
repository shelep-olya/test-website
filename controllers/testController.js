const User = require("../models/userModel");
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
  const id = req.params.id;
  const author = req.user;
  console.log(id);
  if (!author) {
    return res.status(400).send("Author not found.");
  }
  const newTest = await Test.create({
    name,
    numberOfQuestions: parseInt(numberOfQuestions, 10),
    testBlocks,
    author: author._id,
    description,
    numberOfResults: parseInt(numberOfResults, 10),
    results: Array.isArray(results) ? results : [],
  });

  await newTest.save();
  res.status(201).redirect("home");
});
exports.getMoreTests = catchAsync(async (req, res) => {
  const authorId = req.user._id;
  const user = await User.findById(authorId);

  const tests = await Test.find();
  res.render("moreTests", { tests, user: user });
});
exports.getMyTests = catchAsync(async (req, res, next) => {
  const authorId = req.user._id;

  const tests = await Test.find({ author: authorId });

  if (!tests || tests.length === 0) {
    return res.status(404).send("You didn't create any tests");
  }

  res.status(200).render("myTests", { tests, user: req.user });
});
exports.deleteTest = handlerFactory.deleteOne(Test);
exports.getTest = handlerFactory.getOne(Test);
