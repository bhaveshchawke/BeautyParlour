const userModel = require("../Models/userModel");
const otpModel = require("../Models/otpModel");
const sendEmail = require("../Services/emailService");
const bcrypt = require("bcrypt");

// 1. Register Page Data wala function (Jo delete ho gaya tha)
const getRegisterPageData = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists.",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const response = await otpModel.create({
      otp: String(otp), // OTP ko string bana kar bhej diya for safety
      email: email,
    });
    await sendEmail(email, otp);
    if (response) {
      return res.status(200).json({
        message: "otp saved",
      });
    } else {
      return res.status(400).json({
        error: "Something went wrong!",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// 2. OTP Verify wala naya aur ekdum sahi function
const verifyOtp = async (req, res) => {
  const { userName, phone, email, password, otp } = req.body;

  try {
    const validOtp = await otpModel.findOne({ email: email, otp: otp });

    if (!validOtp) {
      return res.status(400).json({
        message: "Invalid or expired otp",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const saveData = await userModel.create({
      userName: userName,
      phone: phone,
      email: email,
      password: hashedPassword,
    });

    if (!saveData) {
      return res.status(400).json({
        error: "something went wrong in saving data",
      });
    }

    res.status(200).json({
      message: "you have been registered!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// 3. Functions ko export karna zaroori hai warna error aayega
module.exports = {
  getRegisterPageData,
  verifyOtp,
};
