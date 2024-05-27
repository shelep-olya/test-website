const express = require("express");
const Test = require("./../models/test-model");
const catchAsync = require("./../utils/catch-async");
const AppError = require("./../utils/app-error");

const sendTest = (data, statusCode, res, redirectUrl) => {
  res.status(statusCode).save(data).redirect(redirectUrl);
};

exports.addTest = catchAsync(async (req, res, next) => {
  const testData = {
    question: req.body.question,
    answers: [req.body.answers],
    author: req.body.author,
    postedAt: Date.now(),
  };

  const newTest = await Test.create(testData);
  sendTest(newTest, 201, res, "/test.ejs");
});
