const serviceModel = require("../Models/serviceModel");
//__for get all services________________________________________
const gellAllServices = async (req, res) => {
  try {
    const response = await serviceModel.find({});
    // Check agar data empty array hai (koi service nahi mili)
    if (!response || response.length === 0) {
      return res.status(404).json({
        error: "data not found",
      });
    }
    res.status(200).json({
      message: "data found",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
module.exports = {
  gellAllServices,
};
