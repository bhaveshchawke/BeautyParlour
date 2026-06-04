const userModel = require("../Models/userModel");
const getRegisterPageData = async (req, res) => {
  const { userName, phone, email, password } = req.body;
  try {
    const response = await userModel.create({
      userName: userName,
      phone: phone,
      email: email,
      password: password,
    });
    if (response) {
      return res.status(200).json({
        message: "Registration successful!",
      });
    } else {
      // Agar kisi wajah se save nahi hua
      return res.status(400).json({
        error: "Something went wrong!",
      });
    }
  } catch (error) {
    res.status(201).json({
      error: error.message,
    });
  }
};
module.exports = {
  getRegisterPageData,
};
