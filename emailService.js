const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmailWithReport = async (toEmail, reportPath, caseId) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: `Threat Analysis Report - Case ${caseId}`,
      text: "Please find attached the threat analysis report.",
      attachments: [
        {
          filename: `${caseId}_report.txt`,
          path: reportPath,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);

    return info.response;
  } catch (error) {
    throw new Error("Email sending failed: " + error.message);
  }
};

module.exports = {
  sendReportEmail: sendEmailWithReport
};