const appointmentModel = require("../Models/apointmentModel");
const serviceModel = require("../Models/serviceModel");
const cloudinary = require("../Services/cloudinaryService");
//for check is admin or not //
const isAdmin = (req, res) => {
  const isAdmin = req.session.isAdmin;
  if (!isAdmin) {
    return res.status(400).json({
      error: "you are not a valid admin ",
    });
  }
  return res.status(200).json({
    isAdmin: true,
    user: {
      id: req.session.userId,
      name: req.session.userName,
      email: req.session.email,
      isAdmin: req.session.isAdmin,
    },
  });
};
//for confirmed appointment//
const confirmedAppointments = async (req, res) => {
  const { id } = req.body;

  try {
    const response = await appointmentModel.findByIdAndUpdate(
      id, // Document ID
      { status: "confirmed" }, // Update
      { new: true }, // Updated document return karega
    );

    res.status(200).json({
      success: true,
      message: "Appointment confirmed successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//for cancel appointment //
const cancelAppointments = async (req, res) => {
  const { id } = req.body;

  try {
    const response = await appointmentModel.findByIdAndUpdate(
      id, // Document ID
      { status: "cancelled" }, // cancelled
      { new: true }, // cancelled document return karega
    );

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//form completed appointments//
const completedAppointments = async (req, res) => {
  const { id } = req.body;

  try {
    const response = await appointmentModel.findByIdAndUpdate(
      id, // Document ID
      { status: "completed" }, // completed
      { new: true }, // completed document return karega
    );

    res.status(200).json({
      success: true,
      message: "Appointment completed successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//for addServices from admin_____________________________________________
const addServices = async (req, res) => {
  try {
    const {
      serviceTitle,
      servicePrice,
      serviceDuration,
      serviceDescription,
      serviceCategory,
    } = req.body;
    let imageUrl = "https://via.placeholder.com/150";

    // Agar image file upload hui hai, toh usko Cloudinary par bhejein
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "beauty_parlor_services",
      });
      imageUrl = result.secure_url;
    }

    // Direct database me create aur save karein (bina .save() likhe)
    const newService = await serviceModel.create({
      serviceTitle,
      servicePrice: Number(servicePrice),
      serviceDuration: Number(serviceDuration),
      serviceDescription,
      image: imageUrl,
      category: serviceCategory,
    });

    res.status(201).json({
      success: true,
      message: "Service added successfully!",
      data: newService,
    });
  } catch (error) {
    console.error("Error in addServices:", error);
    res
      .status(500)
      .json({ error: error.message || "Server Error during upload" });
  }
};

//for Edit data_____________________________________________________
//for edit/update service from admin_____________________________________________
const editService = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      serviceTitle,
      servicePrice,
      serviceDuration,
      serviceDescription,
      serviceCategory,
    } = req.body;

    // Pehle existing service dhoondhein
    const existingService = await serviceModel.findById(id);
    if (!existingService) {
      return res.status(404).json({ error: "Service not found" });
    }

    let imageUrl = existingService.image; // Purani image default rakhein

    // Agar admin ne nayi image select ki hai, toh Cloudinary par bhejein
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "beauty_parlor_services",
      });
      imageUrl = result.secure_url;
    }

    // Database me update karein
    const updatedService = await serviceModel.findByIdAndUpdate(
      id,
      {
        serviceTitle,
        servicePrice: Number(servicePrice),
        serviceDuration: Number(serviceDuration),
        serviceDescription,
        category: serviceCategory,
        image: imageUrl,
      },
      { new: true }, // naya updated document return karega
    );

    res.status(200).json({
      success: true,
      message: "Service updated successfully!",
      data: updatedService,
    });
  } catch (error) {
    console.error("Error in editService:", error);
    res
      .status(500)
      .json({ error: error.message || "Server Error during update" });
  }
};
//for delete service________________________
const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await serviceModel.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({
        error: "can't delete service...",
      });
    }
    res.status(200).json({
      message: "service deleted",
    });
  } catch (error) {
    res.status(401).json({
      error: "can't delete service...",
    });
  }
};

// for toggle active status of service
const toggleServiceActive = async (req, res) => {
  const { id } = req.body;
  try {
    const service = await serviceModel.findById(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    
    service.active = !service.active;
    await service.save();
    res.status(200).json({
      success: true,
      message: `Service is now ${service.active ? "Active" : "Off"}`,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  isAdmin,
  confirmedAppointments,
  cancelAppointments,
  completedAppointments,
  addServices,
  editService,
  deleteService,
  toggleServiceActive,
};
