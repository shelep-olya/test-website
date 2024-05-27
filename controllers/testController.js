const express = require("express");
const Test = require("./../models/test-model");
const catchAsync = require("./../utils/catch-async");
const AppError = require("./../utils/app-error");

const sendTest = (data, statusCode, res, redirectUrl) => {
  res.status(statusCode).render(redirectUrl, { data });
};

exports.addTest = catchAsync(async (req, res, next) => {
  const testData = {
    question: req.body.question,
    answers: req.body.answers,
    author: req.body.author,
    postedAt: Date.now(),
  };

  const newTest = await Test.create(testData);
  sendTest(newTest, 201, res, "test");
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
      new: sendTest(updatedTest, 200, res, "test"),
    }
  );
  sendTest(updatedTest, 200, res, "test");
});
