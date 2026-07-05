const appointmentModel = require("../Models/apointmentModel");
//__getAppointmetFromUi___________________________________________
const getAppointmentInfo = async (req, res) => {
  const { service, date, timeSlot, fullName, phone } = req.body;
  try {
    const response = await appointmentModel.create({
      userId: req.session.userId,
      fullName,
      phone,
      service,
      date,
      timeSlot,
      status: "pending",
    });
    res.status(200).json({
      message: "Apointment Booked",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "something went wrong",
    });
  }
};

// send apointent data to ui//
const sendAppointmentInfo = async (req, res) => {
  try {
    const userId = req.session.userId;
    const response = await appointmentModel
      .find({ userId })
      .sort({ createdAt: -1 });

    if (!response) {
      // Return lagana zaroori hai yahan, warna aage ka code chal jayega
      return res.status(401).json({
        message: "Appointment doesn't exist",
      });
    }

    // ✅ YE LINE MISSING THI! Iske bina data UI tak nahi jayega
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      // Error ke time 500 status dena better hai
      error: error.message,
    });
  }
};

//find appointment by id logic here //
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await appointmentModel.findById(id);
    if (!response) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//for resheduling appointment data//
const reshedule = async (req, res) => {
  const { date, time, id } = req.body;
  try {
    const response = await appointmentModel.findOneAndUpdate(
      { _id: id },
      { date: date, timeSlot: time },
      { returnDocument: "after" },
    );
    if (!response) {
      return res.status(401).json({
        error: "something went wrong",
      });
    }
    res.status(200).json({
      message: "Appointment resheduled",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//for cancel appoinntment//
const cancelAppointment = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await appointmentModel.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { returnDocument: "after" },
    );
    if (!response) {
      return res.status(404).json({ error: "Appointment nahi mila" });
    }

    // Frontend ko response bhej diya naye data ke sath
    res.status(200).json({
      message: "Appointment successfully cancelled",
      data: response,
    });
  } catch (error) {
    // Error aane par server crash hone se bachaye
    res.status(500).json({ error: error.message });
  }
};
//send all apointments to ui//
const getAllAppointments = async (req, res) => {
  try {
    const response = await appointmentModel.find({});
    if (!response) {
      return res.status(400).json({
        error: "Something went wrong!",
      });
    }
    res.status(200).json({
      message: "all apointments fetched...",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
    console.log(error);
  }
};
module.exports = {
  getAppointmentInfo,
  sendAppointmentInfo,
  getAppointmentById,
  reshedule,
  cancelAppointment,
  getAllAppointments,
};
