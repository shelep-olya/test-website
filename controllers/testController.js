const Test = require("./../models/finalTestModel");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catch-async");
const handlerFactory = require("./handlerFactory");

const sendTest = (data, statusCode, res, redirectUrl) => {
  res.status(statusCode).render(redirectUrl, { data });
};
// exports.getAddTestForm = (req, res, next) => {
//   const numQuestions = req.query.numQuestions;
//   const author = req.query.author;
//   res.render("addTest", {
//     title: "add test",
//     numQuestions,
//     author: req.body.author,
//     user: true,
//   });
// };
// exports.getQuestionForm = (req, res) => {
//   res.render("questionForm", {
//     title: "create your own test",
//     user: true,
//   });
// };
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
  // res.status(201).redirect("/home");
});

exports.deleteTest = catchAsync(async (req, res, next) => {
  const id = req.body.id;
  await Test.findByIdAndDelete(id);
  res.status(204).send();
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
