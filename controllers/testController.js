const Test = require("./../models/finalTestModel");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catch-async");
const handlerFactory = require("./handlerFactory");

const sendTest = (data, statusCode, res, redirectUrl) => {
  res.status(statusCode).render(redirectUrl, { data });
};
exports.addTest = catchAsync(async (req, res, next) => {
  const { numberOfQuestions, testBlocks, author, numberOfResults, results } =
    req.body;
  const newTest = await Test.create({
    numberOfQuestions,
    testBlocks,
    author,
    numberOfResults,
    results,
    user: true,
  });
  await newTest.save();
  res.status(201).json({
    status: "success",
    data: newTest,
  });
});

exports.deleteTest = handlerFactory.deleteOne(Test);
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
exports.updateTest = catchAsync(async (req, res, next) => {
  const updatedData = req.body;
  const updatedTest = await Test.findByIdAndUpdate(
    updatedData.id,
    updatedData,
    {
      new: true,
    }
  );
  sendTest(updatedTest, 200, res, "test");
});

exports.getTest = handlerFactory.getOne(Test);
