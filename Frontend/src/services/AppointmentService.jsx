import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const sendApintmentToBacekend = async (data) => {
  try {
    const response = await axios.post(
      `${backendUrl}/appointment/getAppointmentInfo`,
      data,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    // 2. Agar server band hai ya koi dusra error hai
    throw new Error(error.message);
  }
};

// get apointment information from backend //
export const getApointmentDataFromBackend = async () => {
  try {
    const responce = await axios.post(
      `${backendUrl}/appointment/sendAppointmentInfo`,
      {},
      { withCredentials: true },
    );
    return responce.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};
// AppointmentService.jsx me add karein
export const getAppointmentByIdFromBackend = async (id) => {
  try {
    // Yahan hum GET request bhej rahe hain jisme id URL me ja rahi hai
    const response = await axios.get(`${backendUrl}/appointment/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};
//for reshedule appointment //
export const reshedule = async (data) => {
  try {
    const response = await axios.post(
      `${backendUrl}/appointment/reshedule`,
      data,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};
//for cancle Appointment//
export const cancelApointment = async (id) => {
  try {
    const response = await axios.post(
      `${backendUrl}/appointment/cancel`,
      { id },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};
//get all apointments from backend//
export const getAllAppointments = async () => {
  try {
    const response = await axios.post(
      `${backendUrl}/appointment/getAll`,
      {},
      {
        withCredentials: true,
      },
    );
    if (!response) {
      return null;
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};
