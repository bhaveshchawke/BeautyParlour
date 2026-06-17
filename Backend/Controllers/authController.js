const userModel = require("../Models/userModel");
const otpModel = require("../Models/otpModel");
const sendEmail = require("../Services/emailService");
const bcrypt = require("bcrypt");

// 1. Register Page Data wala function (Jo delete ho gaya tha)
const getRegisterPageData = async (req, res) => {
  const { userName, phone, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists Please login..",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (existingUser && !existingUser.isVerified) {
      // Agar user pehle back ho gaya tha bina OTP daale, toh uska naya password/name update kardo
      existingUser.userName = userName;
      existingUser.phone = phone;
      existingUser.password = hashedPassword;
      await existingUser.save();
    } else {
      // User ko turant Database me save kar lo! (isVerified abhi automatically false rahega)
      await userModel.create({
        userName,
        phone,
        email,
        password: hashedPassword,
      });
    }
    // Ab OTP Bhejo
    const otp = Math.floor(100000 + Math.random() * 900000);
    await otpModel.deleteOne({ email }); // Purana OTP delete kardo agar koi bacha ho
    const response = await otpModel.create({ otp: String(otp), email: email });
    await sendEmail(email, otp);
    if (response) {
      return res.status(200).json({ message: "OTP sent to your email!" });
    } else {
      return res.status(400).json({ error: "Something went wrong!" });
    }
  } catch (error) {
    // Duplicate key error (email ya phone already exists)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]; // 'email' ya 'phone'
      return res.status(400).json({
        error: `This ${field} is already registered. Please login.`,
      });
    }
    // Baaki koi bhi unexpected error
    return res.status(500).json({
      error: "Something went wrong. Please try again.",
    });
  }
};

// 2. OTP Verify wala naya aur ekdum sahi function
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body; // Ab backend ko yahan password ya name chahiye hi nahi!

  try {
    const validOtp = await otpModel.findOne({ email: email, otp: otp });

    if (!validOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // ✅ SUCCESS: Ab Database me us saved user ko find karo aur 'isVerified: true' kardo!
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }, // Ye updated user return karega
    );

    if (!updatedUser) {
      return res.status(400).json({ error: "User not found in database!" });
    }

    // ✅ STANDARD 1: Replay attack se bachne ke liye Use hote hi OTP DELETE kar do!
    await otpModel.deleteOne({ email });

    // ✅ STANDARD 2: OTP verify hote hi usko Auto-Login karwa do! (Session save kardo)
    req.session.userId = updatedUser._id;
    req.session.userName = updatedUser.userName;
    req.session.email = updatedUser.email;

    res
      .status(200)
      .json({ message: "Registration Successful! You are now Logged In." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
//getting login  data form user//
const getlogindata = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    //==password matching==/
    if (!isMatch) {
      return res.status(401).json({
        error: "Please enter a valid password.",
      });
    }
    req.session.userId = user._id;
    req.session.userName = user.userName;
    req.session.email = user.email;
    return res.status(200).json({
      message: `You are LoggedIn welocome: ${req.session.userName}`,
    });
  } catch (err) {
    return res.status(401).json({
      error: "Something Went Wrong..",
    });
  }
};

// send user details to ui //
const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      isLoggedIn: true,
      user: {
        id: req.session.userId,
        name: req.session.userName,
        email: req.session.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

//for logout //
const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        error: "Could not log out, please try again",
      });
    }
    //clear all browser cookie
    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Logout successful" });
  });
};
module.exports = {
  getRegisterPageData,
  verifyOtp,
  getlogindata,
  getMe,
  logout,
};
