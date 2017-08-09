import nodemailer from 'nodemailer';

const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const EMAIL_URI = process.env.EMAIL_URI;
const EMAIL_PASS = process.env.EMAIL_PASS;

export default nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: { user: EMAIL_URI, pass: EMAIL_PASS },
});
