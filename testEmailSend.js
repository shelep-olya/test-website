const sendEmail = require("./utils/email");

const testSendEmail = async () => {
  try {
    await sendEmail({
      email: "test-recipient@example.com",
      subject: "Test Email",
      message: "This is a test email.",
    });
    console.log("Test email sent successfully!");
  } catch (error) {
    console.error("Failed to send test email:", error);
  }
};
module.exports = testSendEmail;
