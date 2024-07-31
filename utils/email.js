const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const emailOptions = {
    from: "test-website support <support@test.website.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  try {
    await transporter.sendMail(emailOptions);
    console.log("Email sent successfully to:", option.email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email. Please try again later.");
  }
};

module.exports = sendEmail;
