const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
  service: "Naver",
  auth: {
    user: "cazador7@naver.com",
    pass: "wjrxhak5741!",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  smtpTransport,
};
