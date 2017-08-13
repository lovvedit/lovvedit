import nodemailer from 'nodemailer';

const { EMAIL_SERVICE, EMAIL_URI, EMAIL_PASS } = process.env;

export default nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: { user: EMAIL_URI, pass: EMAIL_PASS },
});
