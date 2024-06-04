const express = require("express");
const Test = require("./../models/test-model");
const catchAsync = require("./../utils/catch-async");
const AppError = require("./../utils/app-error");

const sendTest = (data, statusCode, res, redirectUrl) => {
  res.status(statusCode).render(redirectUrl, { data });
};

exports.addTest = catchAsync(async (req, res, next) => {
  const { question, answers, author } = req.body;
  const newTest = await Test.create({
    question,
    answers,
    author,
    postedAt: Date.now(),
  });
  res.status(201).redirect("/home");
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

exports.getTest = catchAsync(async (req, res, next) => {
  const test = await Test.findById(req.body.id);
  sendTest(test, 200, res, "test");
});
