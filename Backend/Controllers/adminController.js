const appointmentModel = require("../Models/apointmentModel");
const serviceModel = require("../Models/serviceModel");
const cloudinary = require("../Services/cloudinaryService");
const userModel = require("../Models/userModel");
const Product = require("../Models/productModel");
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

//getting all users data from database
const getallusers = async (req, res) => {
  try {
    const users = await userModel.find({});
    if (!users) {
      return res.status(404).json({
        error: "data not found",
      });
    }
    res.status(200).json({
      message: "data founded",
      data: users,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      error: "something went wrong!",
    });
  }
};

//for adding product______________________________
const addProduct = async (req, res) => {
  try {
    // 1. Frontend FormData se fields extract karna (Added brand & badge)
    const {
      productName,
      brand,
      productCategory,
      badge,
      originalPrice,
      salePrice,
      stockQuantity,
      productDescription,
    } = req.body;

    // 2. Basic Validation (Added brand)
    if (
      !productName ||
      !brand ||
      !originalPrice ||
      !salePrice ||
      !stockQuantity ||
      !productDescription
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // 3. Image Handling
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "beauty_parlor_products",
      });
      imageUrl = result.secure_url;
    } else {
      return res.status(400).json({
        success: false,
        message: "Product image is required.",
      });
    }

    // 4. Create New Product in Database (Added brand & badge)
    const newProduct = await Product.create({
      productName,
      brand,
      productCategory,
      badge: badge || "None", // fallback
      originalPrice: Number(originalPrice),
      salePrice: Number(salePrice),
      stockQuantity: Number(stockQuantity),
      productDescription,
      productImage: imageUrl,
    });

    // 5. Send Success Response
    return res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error in addProduct controller:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to add product. Internal Server Error.",
    });
  }
};
//fetching all products________________________________________________________________
const getallProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(404).json({
        error: "product not exists",
      });
    }
    res.status(200).json({
      message: "data found",
      data: products,
    });
  } catch (error) {
    res.status(401).json({
      error: "product not exists",
    });
  }
};
//for update product________________________________________
const updateProduct = async (req, res) => {
  try {
    const {
      id,
      productName,
      brand,
      productCategory,
      badge,
      originalPrice,
      salePrice,
      stockQuantity,
      productDescription,
    } = req.body;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    let imageUrl = existingProduct.productImage; // Purani image default rakhein

    // Agar nayi image aayi hai, toh Cloudinary par upload karein
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "beauty_parlor_products",
      });
      imageUrl = result.secure_url;
    }

    const updatedData = await Product.findByIdAndUpdate(
      id,
      {
        productName,
        brand,
        productCategory,
        badge,
        originalPrice: Number(originalPrice),
        salePrice: Number(salePrice),
        stockQuantity: Number(stockQuantity),
        productDescription,
        productImage: imageUrl,
      },
      { new: true },
    );

    if (!updatedData) {
      return res.status(404).json({
        error: "product can't be updated",
      });
    }
    res.status(200).json({
      message: "Product updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to update product",
    });
  }
};
//___________for delete product____________________________
const deleteProduct = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await Product.findByIdAndDelete(id);
    if (!response) {
      return res.status(401).json({
        error: "can not deleted",
      });
    }
    res.status(200).json({
      message: "product deleted",
    });
  } catch (error) {
    res.status(401).json({
      error: "can not deleted",
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
  getallusers,
  addProduct,
  getallProducts,
  updateProduct,
  deleteProduct,
};
