import nodemailer from "nodemailer";
import { envVariables } from "../config/config.js";

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM,EMAIL_SERVICE } =
  envVariables.email;

// Create a transporter object using the default SMTP transport
// const transport = nodemailer.createTransport({
//   host: EMAIL_HOST,
//   port: EMAIL_PORT,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS,
//   },
// });
const transport = nodemailer.createTransport({
  from: EMAIL_FROM,
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Function to send email

/**
 * Function to send email
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Email body in plain text
 * @param {string} html - Email body in HTML format (optional)
 */

export const sendEmail = async (to, subject, text, html = "") => {
  try {
    const info = await transport.sendMail({
      from: EMAIL_FROM,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};
