const nodemailer = require("nodemailer");
//create transport
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//otp sender
const sendEmail = async (toMail, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toMail,
    subject: "sai-parlour - Verification Code",
    html: `<h2>Your OTP for registration: <b>${otp}</b></h2>
           <p>Yeh 5 minute mein expire ho jayega.</p>`,
  };

  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
